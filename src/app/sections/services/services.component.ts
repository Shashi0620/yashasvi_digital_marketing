import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { whatsappUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-services',
  imports: [RouterLink, IconComponent],
  template: `
    @let c = content().services;
    <section id="services" class="section section--alt" aria-labelledby="services-title">
      <div class="container">
        <header class="section-header">
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h2 id="services-title">{{ c.title }}</h2>
          <p>{{ c.intro }}</p>
        </header>

        <ul class="grid">
          @for (service of c.items; track service.id) {
            <li class="card service" [id]="'service-' + service.id">
              <span class="icon-badge"><app-icon [name]="service.icon" [size]="26" /></span>
              <h3>{{ service.title }}</h3>
              <p class="desc">{{ service.description }}</p>
              <ul class="check-list">
                @for (item of service.highlights; track item) {
                  <li><app-icon name="check" [size]="16" [strokeWidth]="3" />{{ item }}</li>
                }
              </ul>
              @if (service.note) {
                <p class="note"><app-icon name="info" [size]="16" />{{ service.note }}</p>
              }
              <a class="btn btn--ghost enquire" [href]="whatsapp(service.whatsappMessage)" target="_blank" rel="noopener">
                <app-icon name="whatsapp" [size]="18" />
                {{ c.enquireLabel }}
                <span class="visually-hidden">– {{ service.title }} {{ content().common.opensInNewTab }}</span>
              </a>
            </li>
          }
        </ul>

        <div id="packages" class="packages">
          <div>
            <h3>{{ c.packages.title }}</h3>
            <p>{{ c.packages.text }}</p>
          </div>
          <a class="btn btn--accent" routerLink="/" fragment="contact">
            {{ c.packages.cta }}
            <app-icon name="arrow-right" [size]="18" />
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 20px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    @media (min-width: 680px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1080px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .service {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 28px;
      scroll-margin-top: calc(var(--header-h) + 16px);
      transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    }
    .service:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: color-mix(in srgb, var(--c-primary) 40%, var(--c-border));
    }
    h3 {
      margin: 6px 0 0;
    }
    .desc {
      margin: 0;
      color: var(--c-muted);
    }
    .note {
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      background: var(--c-surface);
    }
    .note app-icon {
      margin-top: 2px;
    }
    .enquire {
      margin-top: auto;
      align-self: flex-start;
    }
    .packages {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      margin-top: 32px;
      padding: 28px;
      border-radius: var(--radius-lg);
      background: linear-gradient(120deg, var(--c-primary), color-mix(in srgb, var(--c-primary) 70%, #0b1220));
      color: var(--c-on-primary);
      scroll-margin-top: calc(var(--header-h) + 16px);
    }
    .packages h3 {
      color: inherit;
      font-size: 1.35rem;
      margin-bottom: 6px;
    }
    .packages p {
      margin: 0;
      max-width: 640px;
      opacity: 0.92;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly whatsapp = whatsappUrl;
}
