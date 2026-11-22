type ShareOptions = {
  message: string; // the invitation text
  url: string; // the website link to include in the message
};

const WHATSAPP_BASE_URL = "https://wa.me/";
// Builds a WhatsApp link that opens with the message already written.
// Without a phone number, WhatsApp lets the guest choose who to send it to.
export function buildWhatsAppShareUrl({ message, url }: ShareOptions): string {
  const trimmedUrl = url.trim();

  // Put the link on its own line under the message.
  const fullText = trimmedUrl ? `${message}\n\n${trimmedUrl}` : message;

  // encodeURIComponent converts Arabic letters, emojis and line breaks
  // into characters that are safe to place inside a URL.
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(fullText)}`;
}