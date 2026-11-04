import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { ContentService } from '../../core/services/content.service';
import { mailUrl } from '../../core/utils/contact-links';

@Component({
  selector: 'app-privacy-policy-page',
  template: `
    @let p = content().privacy;
    <article class="section">
      <div class="container narrow">
        <h1>{{ p.title }}</h1>
        <p class="draft" role="note">{{ p.draftNotice }}</p>
        <p class="updated">{{ p.lastUpdated }}</p>
        @for (section of p.sections; track section.heading) {
          <section>
            <h2>{{ section.heading }}</h2>
            @for (paragraph of section.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </section>
        }
        <p>
          <a [href]="mail">{{ email }}</a>
        </p>
      </div>
    </article>
  `,
  styles: `
    .narrow {
      max-width: 820px;
    }
    h2 {
      margin-top: 2rem;
      font-size: 1.35rem;
    }
    p {
      color: var(--c-muted);
    }
    .draft {
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      background: var(--c-warning-soft);
      color: var(--c-warning);
      font-weight: 600;
    }
    .updated {
      font-size: 0.9rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyPage {
  protected readonly content = inject(ContentService).content;
  protected readonly email = SITE_CONFIG.email.primary;
  protected readonly mail = mailUrl(SITE_CONFIG.email.primary);

  constructor() {
    const meta = this.content().meta;
    inject(SeoService).update({
      title: meta.privacyTitle,
      description: meta.privacyDescription,
      path: '/privacy-policy',
    });
  }
}
