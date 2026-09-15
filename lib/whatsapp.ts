const defaultNumber = "923555252025";

export function normalizeWhatsAppNumber(value: string | null | undefined) {
  const digits = value?.replace(/\D/g, "") || "";
  if (/^0\d{10}$/.test(digits)) return `92${digits.slice(1)}`;
  if (/^0092\d{10}$/.test(digits)) return digits.slice(2);
  if (/^92\d{10}$/.test(digits)) return digits;
  if (/^\d{8,15}$/.test(digits)) return digits;
  return undefined;
}

export function whatsappUrl(message?: string) {
  const number = normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultNumber);
  if (!number) return undefined;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function whatsappUrlForNumber(phone: string | null | undefined) {
  const number = normalizeWhatsAppNumber(phone);
  return number ? `https://wa.me/${number}` : undefined;
}
