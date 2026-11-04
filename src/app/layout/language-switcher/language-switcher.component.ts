import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

/**
 * English / Kannada switcher. Rendered only when more than one language is
 * enabled in `site.config.ts`; switching changes the actual page content.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [IconComponent],
  template: `
    @if (service.availableLanguages.length > 1) {
      <div class="switcher" role="group" [attr.aria-label]="content().language.label">
        <app-icon name="languages" [size]="18" />
        @for (code of service.availableLanguages; track code) {
          <button
            type="button"
            [attr.lang]="code"
            [attr.aria-pressed]="service.language() === code"
            (click)="service.setLanguage(code)"
          >
            {{ content().language.names[code] }}
          </button>
        }
      </div>
    }
  `,
  styles: `
    .switcher {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 3px 3px 10px;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-pill);
      color: var(--c-muted);
    }
    button {
      min-height: 36px;
      padding: 4px 10px;
      border: 0;
      border-radius: var(--radius-pill);
      background: transparent;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }
    button[aria-pressed='true'] {
      background: var(--c-primary);
      color: var(--c-on-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  protected readonly service = inject(ContentService);
  protected readonly content = this.service.content;
}
