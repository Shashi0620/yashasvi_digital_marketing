import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/** Must match the key used by the inline script in `src/index.html`. */
export const THEME_STORAGE_KEY = 'yds-theme';

/**
 * Light / dark / system theme handling.
 *
 * The initial theme is applied by a tiny inline script in `index.html` before
 * the page paints (no flash). This service takes over once the app boots.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly preference = signal<ThemePreference>('system');
  private readonly systemPrefersDark = signal(false);

  readonly resolved = computed<ResolvedTheme>(() => {
    const preference = this.preference();
    if (preference === 'system') return this.systemPrefersDark() ? 'dark' : 'light';
    return preference;
  });

  constructor() {
    if (!this.isBrowser) return;

    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (media) {
      this.systemPrefersDark.set(media.matches);
      media.addEventListener('change', (event) => this.systemPrefersDark.set(event.matches));
    }

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') this.preference.set(stored);
    } catch {
      // Storage unavailable — follow the system preference.
    }

    effect(() => {
      const theme = this.resolved();
      const root = this.document.documentElement;
      root.dataset['theme'] = theme;
      root.style.colorScheme = theme;
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#0b1220' : '#1f47c8');
    });
  }

  toggle(): void {
    this.setPreference(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  setPreference(preference: ThemePreference): void {
    this.preference.set(preference);
    try {
      if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // Ignore storage errors.
    }
  }
}
