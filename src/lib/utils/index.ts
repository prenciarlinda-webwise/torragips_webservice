export { cn } from './cn';

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s/g, '');
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = formatPhoneNumber(phone).replace('+', '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
