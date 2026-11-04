import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { IconNode } from 'lucide';
import { ICONS, IconName } from './icons';

function toSvg(node: IconNode, size: number, strokeWidth: number): string {
  const children = node
    .map(([tag, attrs]) => {
      const attrString = Object.entries(attrs)
        .map(([key, value]) => `${key}="${String(value)}"`)
        .join(' ');
      return `<${tag} ${attrString}/>`;
    })
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ` +
    `fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" ` +
    `stroke-linejoin="round" focusable="false" aria-hidden="true">${children}</svg>`
  );
}

/**
 * Decorative icon. Always hidden from assistive technology — give the parent
 * control an accessible name instead.
 */
@Component({
  selector: 'app-icon',
  template: '',
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
  `,
  host: {
    'aria-hidden': 'true',
    '[innerHTML]': 'svg()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  readonly strokeWidth = input(2);

  private readonly sanitizer = inject(DomSanitizer);

  // Icon data is static and bundled with the app, so bypassing sanitisation is safe.
  protected readonly svg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      toSvg(ICONS[this.name()], this.size(), this.strokeWidth()),
    ),
  );
}
