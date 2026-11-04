import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentService } from './core/services/content.service';
import { ThemeService } from './core/services/theme.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { WhatsAppFloatingButtonComponent } from './layout/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsAppFloatingButtonComponent],
  template: `
    <a class="skip-link" href="#main" (click)="skipToMain($event)">{{ content().common.skipToContent }}</a>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly content = inject(ContentService).content;

  constructor() {
    // Instantiate early so the saved theme is applied as soon as the app boots.
    inject(ThemeService);
  }

  // `<base href="/">` would turn "#main" into "/#main" on sub-pages, so focus directly.
  protected skipToMain(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  }
}
