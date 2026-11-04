import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response } from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.disable('x-powered-by');

/** Basic security headers for every response. */
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

/* ------------------------------------------------------------------------- *
 * Contact form endpoint
 *
 * The browser never sees any secret. Enquiries are validated here and then
 * forwarded as JSON to CONTACT_WEBHOOK_URL (for example a Google Apps Script,
 * Formspree, Make/Zapier or your own CRM webhook). Optional
 * CONTACT_WEBHOOK_TOKEN is sent as a Bearer token.
 *
 * Without CONTACT_WEBHOOK_URL the endpoint answers 503 — the website then
 * shows an honest error instead of a false "message sent".
 * ------------------------------------------------------------------------- */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimitHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitHits.set(ip, hits);
  if (rateLimitHits.size > 5000) rateLimitHits.clear(); // simple memory guard
  return hits.length > RATE_LIMIT_MAX;
}

const BUSINESS_TYPES = new Set([
  'real-estate',
  'healthcare',
  'education',
  'retail',
  'hospitality',
  'industrial',
  'other',
]);
const SERVICES = new Set(['local-seo', 'ads', 'websites', 'social-media', 'content', 'branding']);
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

/** Removes control characters and trims; returns '' for non-strings. */
function clean(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

app.post('/api/contact', express.json({ limit: '10kb' }), async (req: Request, res: Response) => {
  const ip = req.ip ?? 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'too_many_requests' });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot filled → silently accept so bots learn nothing.
  if (clean(body['website'], 200)) {
    res.json({ ok: true });
    return;
  }

  const enquiry = {
    name: clean(body['name'], 80),
    phone: clean(body['phone'], 16).replace(/[\s-]/g, ''),
    businessType: clean(body['businessType'], 40),
    serviceNeeded: clean(body['serviceNeeded'], 40),
    message: clean(body['message'], 1000),
    consent: body['consent'] === true,
  };

  const errors: string[] = [];
  if (enquiry.name.length < 2) errors.push('name');
  if (!INDIAN_MOBILE.test(enquiry.phone)) errors.push('phone');
  if (!BUSINESS_TYPES.has(enquiry.businessType)) errors.push('businessType');
  if (!SERVICES.has(enquiry.serviceNeeded)) errors.push('serviceNeeded');
  if (!enquiry.consent) errors.push('consent');
  if (errors.length) {
    res.status(400).json({ error: 'invalid', fields: errors });
    return;
  }

  const webhookUrl = process.env['CONTACT_WEBHOOK_URL'];
  if (!webhookUrl) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = process.env['CONTACT_WEBHOOK_TOKEN'];
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const forward = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...enquiry, receivedAt: new Date().toISOString(), source: 'website' }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!forward.ok) throw new Error(`Webhook responded ${forward.status}`);
    res.json({ ok: true });
  } catch (error) {
    console.error('[contact] forwarding failed:', error);
    res.status(502).json({ error: 'delivery_failed' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
