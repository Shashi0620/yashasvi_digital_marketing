import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-about',
  imports: [IconComponent],
  template: `
    @let c = content().about;
    <section id="about" class="section" aria-labelledby="about-title">
      <div class="container grid">
        <div>
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h2 id="about-title">{{ c.title }}</h2>
          @for (paragraph of c.paragraphs; track $index) {
            <p class="text">{{ paragraph }}</p>
          }
        </div>
        <aside class="card profile">
          <dl>
            <div>
              <dt>{{ c.founderLabel }}</dt>
              <dd>{{ config.founder.name }}</dd>
            </div>
            <div>
              <dt>{{ c.locationLabel }}</dt>
              <dd>{{ config.location.locality }}, {{ config.location.region }}, {{ config.location.state }}</dd>
            </div>
          </dl>
          <ul class="points">
            @for (point of c.points; track point.title) {
              <li>
                <span class="icon-badge"><app-icon [name]="point.icon" /></span>
                <div>
                  <h3>{{ point.title }}</h3>
                  <p>{{ point.text }}</p>
                </div>
              </li>
            }
          </ul>
        </aside>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 40px;
      align-items: start;
    }
    @media (min-width: 960px) {
      .grid {
        grid-template-columns: 1.2fr 0.8fr;
        gap: 64px;
      }
    }
    .text {
      color: var(--c-muted);
      font-size: 1.05rem;
    }
    .profile {
      padding: 28px;
    }
    dl {
      display: grid;
      gap: 16px;
      margin: 0 0 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--c-border);
    }
    dt {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--c-muted);
    }
    dd {
      margin: 2px 0 0;
      font-size: 1.15rem;
      font-weight: 700;
    }
    .points {
      display: grid;
      gap: 20px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .points li {
      display: flex;
      gap: 16px;
    }
    .points h3 {
      margin-bottom: 4px;
      font-size: 1.05rem;
    }
    .points p {
      margin: 0;
      color: var(--c-muted);
      font-size: 0.95rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly config = SITE_CONFIG;
}
