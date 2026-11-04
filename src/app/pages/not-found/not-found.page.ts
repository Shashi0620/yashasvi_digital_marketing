import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, IconComponent],
  template: `
    @let n = content().notFound;
    <section class="section">
      <div class="container wrap">
        <p class="code" aria-hidden="true">404</p>
        <h1>{{ n.title }}</h1>
        <p>{{ n.text }}</p>
        <a class="btn btn--primary" routerLink="/">
          <app-icon name="house" [size]="18" />
          {{ n.cta }}
        </a>
      </div>
    </section>
  `,
  styles: `
    .wrap {
      max-width: 640px;
      text-align: center;
      padding-block: 40px;
    }
    .code {
      margin: 0;
      font-size: clamp(4rem, 12vw, 7rem);
      font-weight: 900;
      line-height: 1;
      color: var(--c-link);
    }
    p {
      color: var(--c-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  protected readonly content = inject(ContentService).content;

  constructor() {
    const meta = this.content().meta;
    inject(SeoService).update({
      title: meta.notFoundTitle,
      description: meta.notFoundDescription,
      path: '/404',
      index: false,
    });
  }
}
