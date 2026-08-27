const defaultNumber = "923555252025";

export function whatsappUrl(message?: string) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultNumber).replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
