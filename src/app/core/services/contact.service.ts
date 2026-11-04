import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

/**
 * Sends enquiries to the backend endpoint. No secrets live in the browser:
 * the server (`src/server.ts`) holds the forwarding configuration.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  readonly mode = environment.contactForm.mode;

  submit(enquiry: ContactEnquiry): Observable<{ ok: true }> {
    return this.http.post<{ ok: true }>(environment.contactForm.endpoint, enquiry);
  }
}
