import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContentService } from '../../core/services/content.service';
import { ThemeService } from '../../core/services/theme.service';
import { mailUrl, telUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly content = inject(ContentService).content;
  protected readonly theme = inject(ThemeService);
  protected readonly config = SITE_CONFIG;
  protected readonly year = new Date().getFullYear();
  protected readonly tel = telUrl();
  protected readonly mail = mailUrl(SITE_CONFIG.email.primary);
}
