import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContentService } from '../../core/services/content.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { whatsappUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconComponent, ThemeToggleComponent, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly activeSection = inject(UiStateService).activeSection;
  protected readonly config = SITE_CONFIG;
  protected readonly auditUrl = whatsappUrl(SITE_CONFIG.whatsapp.auditMessage);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
