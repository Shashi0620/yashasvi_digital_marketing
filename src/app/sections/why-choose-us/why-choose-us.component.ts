import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-why-choose-us',
  imports: [IconComponent],
  template: `
    @let c = content().whyUs;
    <section id="why-us" class="section" aria-labelledby="why-title">
      <div class="container">
        <header class="section-header">
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h2 id="why-title">{{ c.title }}</h2>
          <p>{{ c.intro }}</p>
        </header>
        <ul class="grid">
          @for (item of c.items; track item.title) {
            <li>
              <span class="icon-badge"><app-icon [name]="item.icon" /></span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 32px 28px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1000px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    li {
      padding-left: 20px;
      border-left: 3px solid var(--c-accent);
    }
    h3 {
      margin: 14px 0 6px;
      font-size: 1.1rem;
    }
    p {
      margin: 0;
      color: var(--c-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyChooseUsComponent {
  protected readonly content = inject(ContentService).content;
}
