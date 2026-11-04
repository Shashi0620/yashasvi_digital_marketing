import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-industries',
  imports: [IconComponent],
  template: `
    @let c = content().industries;
    <section id="industries" class="section" aria-labelledby="industries-title">
      <div class="container">
        <header class="section-header">
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h2 id="industries-title">{{ c.title }}</h2>
          <p>{{ c.intro }}</p>
        </header>
        <ul class="grid">
          @for (industry of c.items; track industry.title) {
            <li class="card item">
              <span class="icon-badge"><app-icon [name]="industry.icon" /></span>
              <div>
                <h3>{{ industry.title }}</h3>
                <p>{{ industry.text }}</p>
              </div>
            </li>
          }
        </ul>
        <p class="note centered">{{ c.note }}</p>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 16px;
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
    .item {
      display: flex;
      gap: 16px;
      padding: 22px;
    }
    .icon-badge {
      background: var(--c-accent-soft);
      color: var(--c-warning);
    }
    h3 {
      margin-bottom: 6px;
      font-size: 1.05rem;
    }
    p {
      margin: 0;
      color: var(--c-muted);
      font-size: 0.95rem;
    }
    .centered {
      margin-top: 24px;
      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustriesComponent {
  protected readonly content = inject(ContentService).content;
}
