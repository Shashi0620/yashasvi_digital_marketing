import { SiteContent } from './content.model';

export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/**
 * Kannada copy. Any key left out falls back to English.
 *
 * Add translations here using the same structure as `content.en.ts`, have them
 * reviewed by a native speaker, then set `enableKannada: true` in
 * `site.config.ts` to show the language switcher.
 *
 * Arrays (for example `services.items`) replace the English array as a whole,
 * so translate every entry of an array you include.
 */
export const CONTENT_KN: DeepPartial<SiteContent> = {
  language: {
    label: 'ಭಾಷೆ',
  },
};
