import { SITE_CONFIG } from '../config/site.config';

const phoneDigits = (): string => SITE_CONFIG.phone.e164.replace(/\D/g, '');

export const isPhoneConfigured = (): boolean => phoneDigits().length >= 10;

/**
 * Builds a wa.me link with a pre-filled message. Until the business number is
 * configured the link opens WhatsApp's contact picker instead of a chat.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${phoneDigits()}?text=${encodeURIComponent(message)}`;
}

/** `tel:` link, or null while the phone number is still a placeholder. */
export function telUrl(): string | null {
  return isPhoneConfigured() ? `tel:+${phoneDigits()}` : null;
}

export function mailUrl(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
