import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  getAllowedHosts,
  getContext,
  getTrustProxyHeaders,
} from '@netlify/angular-runtime/app-engine.js';

/**
 * Netlify-compatible server entry (runs as a Netlify Edge Function).
 *
 * Prerendered pages (home, privacy policy) and static files are served directly
 * from Netlify's CDN and never reach this handler; it renders everything else,
 * e.g. unknown URLs with a real 404 status.
 *
 * Contact-form enquiries are handled by Netlify Forms, so no API endpoint or
 * secret is needed here.
 */
const angularAppEngine = new AngularAppEngine({
  allowedHosts: getAllowedHosts(),
  trustProxyHeaders: getTrustProxyHeaders(),
});

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();
  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
