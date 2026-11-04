import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { ThemeService } from '../../core/services/theme.service';
import { IconComponent } from '../../shared/icon/icon.component';

/**
 * Light/dark toggle. Both icons are rendered and CSS shows the right one based on
 * `<html data-theme>`, which is set before paint — so the icon never flashes.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [IconComponent],
  template: `
    <button
      type="button"
      class="toggle"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      (click)="theme.toggle()"
    >
      <app-icon class="sun" name="sun" [size]="20" />
      <app-icon class="moon" name="moon" [size]="20" />
    </button>
  `,
  styles: `
    .toggle {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-pill);
      background: var(--c-card);
      color: var(--c-text);
      cursor: pointer;
      transition: background-color var(--transition), border-color var(--transition);
    }
    .toggle:hover {
      background: var(--c-surface-2);
      border-color: var(--c-primary);
    }
    /* Light theme shows the moon ("switch to dark"); dark theme shows the sun. */
    .sun {
      display: none;
    }
    :host-context([data-theme='dark']) .sun {
      display: inline-flex;
      color: var(--c-accent);
    }
    :host-context([data-theme='dark']) .moon {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
  private readonly content = inject(ContentService).content;

  protected readonly label = computed(() =>
    this.theme.resolved() === 'dark' ? this.content().theme.toLight : this.content().theme.toDark,
  );
}
