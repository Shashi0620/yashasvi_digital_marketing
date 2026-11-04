import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Marketing pages are prerendered to static HTML at build time for speed and SEO.
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  // Unknown URLs are rendered on the server with a real 404 status.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
