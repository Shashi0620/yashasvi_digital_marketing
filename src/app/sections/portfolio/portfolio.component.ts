import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-portfolio',
  imports: [IconComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  protected readonly content = inject(ContentService).content;
}
