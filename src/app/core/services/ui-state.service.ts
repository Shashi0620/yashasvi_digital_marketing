import { Injectable, signal } from '@angular/core';
import { SectionId } from '../content/content.model';

/** Small shared UI state used across otherwise unrelated components. */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  /** Home-page section currently in view; highlights the matching nav link. */
  readonly activeSection = signal<SectionId | null>(null);

  /**
   * True while the contact form is on screen. The floating WhatsApp button hides
   * on small screens then so it never covers form controls.
   */
  readonly contactFormInView = signal(false);
}
