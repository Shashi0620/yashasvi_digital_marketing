import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { SectionId } from '../../core/content/content.model';
import { SeoService } from '../../core/seo/seo.service';
import { buildHomeStructuredData } from '../../core/seo/structured-data';
import { ContentService } from '../../core/services/content.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { IndustriesComponent } from '../../sections/industries/industries.component';
import { PortfolioComponent } from '../../sections/portfolio/portfolio.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { WhyChooseUsComponent } from '../../sections/why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    IndustriesComponent,
    PortfolioComponent,
    WhyChooseUsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-services />
    <app-industries />
    <app-portfolio />
    <app-why-choose-us />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor() {
    const content = inject(ContentService).content();
    const seo = inject(SeoService);
    seo.update({
      title: content.meta.homeTitle,
      description: content.meta.homeDescription,
      path: '/',
    });
    seo.setJsonLd('home', buildHomeStructuredData());

    this.trackActiveSection(content.nav.items.map((item) => item.id));
  }

  /** Scroll-spy: highlights the nav link of the section currently in view. */
  private trackActiveSection(ids: SectionId[]): void {
    const ui = inject(UiStateService);
    const destroyRef = inject(DestroyRef);
    const seo = inject(SeoService);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) ui.activeSection.set(entry.target.id as SectionId);
          }
        },
        // A section counts as active while it crosses the upper-middle of the viewport.
        { rootMargin: '-35% 0px -60% 0px' },
      );
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }

      destroyRef.onDestroy(() => {
        observer.disconnect();
        ui.activeSection.set(null);
        seo.setJsonLd('home', null);
      });
    });
  }
}
