import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContentService } from '../../core/services/content.service';
import { whatsappUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, IconComponent],
  template: `
    @let c = content().hero;
    <section id="home" class="hero" aria-labelledby="hero-title">
      <div class="container grid">
        <div class="copy">
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h1 id="hero-title">{{ c.title }}</h1>
          <p class="lead">{{ c.text }}</p>
          <div class="ctas">
            <a class="btn btn--accent" [href]="auditUrl" target="_blank" rel="noopener">
              <app-icon name="whatsapp" [size]="20" />
              {{ c.primaryCta }}
              <span class="visually-hidden">{{ content().common.opensInNewTab }}</span>
            </a>
            <a class="btn btn--outline" routerLink="/" fragment="packages">
              {{ c.secondaryCta }}
              <app-icon name="arrow-right" [size]="18" />
            </a>
          </div>
          <ul class="highlights">
            @for (item of c.highlights; track item) {
              <li><app-icon name="check" [size]="16" [strokeWidth]="3" />{{ item }}</li>
            }
          </ul>
        </div>
        <div class="visual">
          <img
            src="/images/hero-illustration.svg"
            [alt]="c.imageAlt"
            width="640"
            height="520"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      padding-block: clamp(40px, 7vw, 96px) clamp(56px, 8vw, 104px);
      background:
        radial-gradient(60% 60% at 90% 10%, color-mix(in srgb, var(--c-accent) 14%, transparent), transparent 70%),
        linear-gradient(180deg, var(--c-hero-from), var(--c-hero-to));
    }
    .grid {
      display: grid;
      gap: 40px;
      align-items: center;
    }
    @media (min-width: 960px) {
      .grid {
        grid-template-columns: 1.1fr 0.9fr;
        gap: 56px;
      }
    }
    h1 {
      margin-bottom: 20px;
    }
    .lead {
      max-width: 620px;
      font-size: clamp(1.05rem, 1rem + 0.35vw, 1.2rem);
      color: var(--c-muted);
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 28px 0;
    }
    .highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .highlights li {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-pill);
      background: var(--c-card);
      font-size: 0.875rem;
      font-weight: 600;
    }
    .highlights app-icon {
      color: var(--c-success);
    }
    .visual img {
      display: block;
      width: 100%;
      height: auto;
      filter: drop-shadow(var(--shadow-lg));
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly auditUrl = whatsappUrl(SITE_CONFIG.whatsapp.auditMessage);
}
