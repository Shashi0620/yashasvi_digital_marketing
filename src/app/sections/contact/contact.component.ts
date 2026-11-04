import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContactService } from '../../core/services/contact.service';
import { ContentService } from '../../core/services/content.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { mailUrl, telUrl, whatsappUrl } from '../../core/utils/contact-links';
import { IconComponent } from '../../shared/icon/icon.component';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'demo';
type ValidatedField = 'name' | 'phone' | 'businessType' | 'serviceNeeded' | 'message' | 'consent';

/** Indian mobile number, optionally prefixed with +91, 91 or 0. */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

function indianMobileValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = (control.value ?? '').replace(/[\s-]/g, '');
  if (!value) return null;
  return INDIAN_MOBILE.test(value) ? null : { phoneInvalid: true };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly ui = inject(UiStateService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly content = inject(ContentService).content;
  protected readonly config = SITE_CONFIG;
  protected readonly tel = telUrl();
  protected readonly mail = mailUrl(SITE_CONFIG.email.primary, 'Website enquiry');
  protected readonly altMail = mailUrl(SITE_CONFIG.email.alternative, 'Website enquiry');
  protected readonly whatsappGreeting = whatsappUrl(SITE_CONFIG.whatsapp.greeting);
  protected readonly isDemo = this.contactService.mode === 'demo';

  protected readonly status = signal<FormStatus>('idle');
  protected readonly submitted = signal(false);
  protected readonly demoWhatsappUrl = signal('');

  private readonly formCard = viewChild.required<ElementRef<HTMLElement>>('formCard');

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    phone: ['', [Validators.required, indianMobileValidator]],
    businessType: ['', Validators.required],
    serviceNeeded: ['', Validators.required],
    message: ['', Validators.maxLength(1000)],
    consent: [false, Validators.requiredTrue],
    website: [''], // honeypot
  });

  protected readonly serviceOptions = computed(() =>
    this.content().services.items.map((s) => ({ value: s.id, label: s.title })),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => this.ui.contactFormInView.set(entry.isIntersecting),
        { threshold: 0.05 },
      );
      observer.observe(this.formCard().nativeElement);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        this.ui.contactFormInView.set(false);
      });
    });
  }

  /** Show a control's error once it has been touched or the form was submitted. */
  protected showError(name: ValidatedField): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    if (this.status() === 'submitting') return;
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isDemo) {
      this.demoWhatsappUrl.set(whatsappUrl(this.buildWhatsappSummary()));
      this.status.set('demo');
      return;
    }

    this.status.set('submitting');
    this.contactService
      .submit({ ...value, phone: value.phone.replace(/[\s-]/g, '') })
      .pipe(finalize(() => this.form.enable()))
      .subscribe({
        next: () => {
          this.status.set('success');
          this.resetForm();
        },
        error: () => this.status.set('error'),
      });
    this.form.disable();
  }

  protected startOver(): void {
    this.status.set('idle');
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }

  private buildWhatsappSummary(): string {
    const v = this.form.getRawValue();
    const f = this.content().contact.form;
    const businessType = f.businessTypes.find((o) => o.value === v.businessType)?.label ?? v.businessType;
    const service = this.serviceOptions().find((o) => o.value === v.serviceNeeded)?.label ?? v.serviceNeeded;
    return [
      'Hi Yashasvi Digital Solutions, I would like to enquire about your services.',
      `${f.name}: ${v.name}`,
      `${f.phone}: ${v.phone}`,
      `${f.businessType}: ${businessType}`,
      `${f.serviceNeeded}: ${service}`,
      v.message ? `${f.message}: ${v.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  private focusFirstInvalid(): void {
    queueMicrotask(() => {
      this.host.nativeElement
        .querySelector<HTMLElement>('form .ng-invalid:not(form)')
        ?.focus();
    });
  }
}
