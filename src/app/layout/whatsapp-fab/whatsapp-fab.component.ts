import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContentService } from '../../core/services/content.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { whatsappUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [IconComponent],
  template: `
    <a
      class="fab"
      [class.fab--tucked]="ui.contactFormInView()"
      [href]="url"
      target="_blank"
      rel="noopener"
      [attr.aria-label]="content().whatsappFab.label + ' ' + content().common.opensInNewTab"
      [attr.title]="content().whatsappFab.label"
    >
      <app-icon name="whatsapp" [size]="30" />
    </a>
  `,
  styles: `
    .fab {
      position: fixed;
      right: max(16px, env(safe-area-inset-right));
      bottom: max(16px, env(safe-area-inset-bottom));
      z-index: 90;
      display: grid;
      place-items: center;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #25d366;
      color: #ffffff;
      box-shadow:
        0 0 0 3px var(--c-bg),
        0 10px 24px rgb(0 0 0 / 25%);
      transition:
        transform var(--transition),
        opacity var(--transition);
    }
    .fab:hover {
      transform: scale(1.06);
    }
    .fab:focus-visible {
      box-shadow: var(--focus-ring);
      border-radius: 50%;
    }
    /* On small screens, step aside while the contact form is visible. */
    @media (max-width: 767px) {
      .fab--tucked {
        opacity: 0;
        transform: translateY(24px);
        pointer-events: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsAppFloatingButtonComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly ui = inject(UiStateService);
  protected readonly url = whatsappUrl(SITE_CONFIG.whatsapp.greeting);
}
