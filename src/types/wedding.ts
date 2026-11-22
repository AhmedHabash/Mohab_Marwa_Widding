// Describes one person in the couple (groom or bride).
export type Person = {
  nameAr: string; // Arabic name, e.g. "إسلام"
  nameEn: string; // English name, e.g. "Islam"
  initialAr: string; // Arabic initial used in the monogram
  initialEn: string; // Latin initial used in the monogram
};

// Icon keys for timeline events. The timeline component maps each key
// to an actual Lucide icon, so this file stays free of React imports.
export type TimelineIcon =
  | "arrival"
  | "ceremony"
  | "photos"
  | "dinner"
  | "dance";

// One moment in the wedding evening.
export type TimelineEvent = {
  id: string;
  time: string; // Display text, e.g. "٧:٠٠ م"
  title: string;
  description: string;
  icon: TimelineIcon;
};

// The wedding date, stored in two forms:
// - dateTimeISO is used by the countdown (machine readable)
// - the other fields are used for display (human readable)
export type WeddingDate = {
  dateTimeISO: string; // e.g. "2026-12-10T19:00:00+02:00"
  weekdayAr: string; // e.g. "الخميس"
  dayLabel: string; // e.g. "١٠"
  monthAr: string; // e.g. "ديسمبر"
  year: string; // e.g. "٢٠٢٦"
  numeric: string; // e.g. "10 / 12 / 2026"
};

export type Venue = {
  nameAr: string;
  mapsUrl: string;
};

// Original Arabic texts shown across the website.
export type InvitationContent = {
  heroPhrase: string; // short phrase in the hero section
  invitationTitle: string; // heading of the invitation section
  paragraphs: string[]; // body of the invitation, one string per paragraph
  closingMessage: string; // heartfelt message in the closing section
};

export type ShareConfig = {
  message: string; // text sent along with the link on WhatsApp
};

export type MusicConfig = {
  enabled: boolean; // lets us turn the music feature on/off easily
  src: string; // path inside /public, e.g. "/audio/wedding-music.mp3"
};

// One social media link shown next to the design credit.
export type SocialLink = {
  id: string; // unique key, e.g. "facebook"
  label: string; // text shown to the guest, e.g. "فيسبوك"
  url: string; // full link, e.g. "https://github.com/username"
};

// Credit line shown quietly at the very end of the invitation.
export type Credit = {
  label: string; // text before the name, e.g. "صُمّمت هذه الدعوة بحبّ بواسطة"
  name: string; // the designer's name
  relation: string; // how he is related to the couple
  links: SocialLink[]; // the designer's social media links
};

// The full configuration object. This is the single source of truth
// for everything that can change in the invitation.
export type WeddingConfig = {
  groom: Person;
  bride: Person;
  date: WeddingDate;
  venue: Venue;
  invitation: InvitationContent;
  timeline: TimelineEvent[];
  share: ShareConfig;
  music: MusicConfig;
  credit: Credit;
};
