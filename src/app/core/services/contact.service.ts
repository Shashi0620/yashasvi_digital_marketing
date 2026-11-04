import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactEnquiry {
  name: string;
  phone: string;
  businessType: string;
  serviceNeeded: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. Bots tend to fill every field. */
  website: string;
}

/** Must match the `name` of the form in `public/forms/contact.html`. */
const NETLIFY_FORM_NAME = 'contact';

/**
 * Sends enquiries to Netlify Forms. No secrets live in the browser; submissions
 * appear in the Netlify dashboard (Forms → contact), which can email them on.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  readonly mode = environment.contactForm.mode;

  submit(enquiry: ContactEnquiry): Observable<void> {
    const body = new URLSearchParams({
      'form-name': NETLIFY_FORM_NAME,
      name: enquiry.name,
      phone: enquiry.phone,
      businessType: enquiry.businessType,
      serviceNeeded: enquiry.serviceNeeded,
      message: enquiry.message,
      consent: enquiry.consent ? 'yes' : 'no',
      website: enquiry.website,
    });
    return this.http
      .post(environment.contactForm.endpoint, body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        responseType: 'text',
      })
      .pipe(map(() => undefined));
  }
}
