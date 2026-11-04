import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { SITE_CONFIG } from '../config/site.config';

export interface PageSeo {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/privacy-policy". */
  path: string;
  /** Set false for pages that should not appear in search (e.g. 404). */
  index?: boolean;
}

/**
 * Sets title, description, canonical URL, Open Graph / Twitter tags and JSON-LD.
 * Runs during prerendering, so tags are present in the static HTML crawlers read.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(page: PageSeo): void {
    const url = `${environment.siteUrl}${page.path === '/' ? '/' : page.path}`;
    const image = SITE_CONFIG.ogImagePath ? `${environment.siteUrl}${SITE_CONFIG.ogImagePath}` : '';

    this.title.setTitle(page.title);
    this.setName('description', page.description);
    this.setName('robots', page.index === false ? 'noindex, follow' : 'index, follow');

    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', SITE_CONFIG.businessName);
    this.setProperty('og:locale', 'en_IN');
    this.setProperty('og:title', page.title);
    this.setProperty('og:description', page.description);
    this.setProperty('og:url', url);
    this.setName('twitter:card', image ? 'summary_large_image' : 'summary');
    this.setName('twitter:title', page.title);
    this.setName('twitter:description', page.description);

    if (image) {
      this.setProperty('og:image', image);
      this.setName('twitter:image', image);
    } else {
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('name="twitter:image"');
    }

    this.setCanonical(page.index === false ? null : url);
  }

  /** Adds or replaces a JSON-LD block identified by `id`. */
  setJsonLd(id: string, data: object | null): void {
    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script[data-jsonld="${id}"]`);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', id);
      head.appendChild(script);
    }
    // Escape "<" so content can never close the script tag.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  private setCanonical(url: string | null): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!url) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }
}
