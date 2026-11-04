import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../config/site.config';
import { CONTENT_EN } from '../content/content.en';
import { CONTENT_KN } from '../content/content.kn';
import { LanguageCode, SiteContent } from '../content/content.model';

const STORAGE_KEY = 'yds-language';

function mergeContent<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return override as T;
  }
  const result = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    result[key] = mergeContent((base as Record<string, unknown>)[key], value);
  }
  return result as T;
}

/** Provides the active language's copy to every component. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly availableLanguages: LanguageCode[] = SITE_CONFIG.enableKannada ? ['en', 'kn'] : ['en'];
  readonly language = signal<LanguageCode>('en');

  private readonly kannada = mergeContent(CONTENT_EN, CONTENT_KN);

  readonly content = computed<SiteContent>(() =>
    this.language() === 'kn' ? this.kannada : CONTENT_EN,
  );

  constructor() {
    if (this.isBrowser && SITE_CONFIG.enableKannada) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'kn' || stored === 'en') this.language.set(stored);
      } catch {
        // Storage unavailable (private mode etc.) — keep the default.
      }
    }
    effect(() => {
      this.document.documentElement.lang = this.language() === 'kn' ? 'kn' : 'en';
    });
  }

  setLanguage(language: LanguageCode): void {
    this.language.set(language);
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors.
    }
  }
}
