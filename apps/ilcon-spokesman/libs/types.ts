
export interface EventDetails {
  name: string;
  subtitle: string;
  date: string;
  location: string;
  registrationLink: string;
  meetingLinks?: MeetingLinks;
}

export interface MeetingLinks {
  youtube?: string;
  facebook?: string;
  mixlr?: string;
  instagram?: string;
  tiktok?: string;
  zoom?: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}



export interface Speaker {
  id: number;
  slug: string;
  name: string;
  role: string;
  bio: string;
  type: "guest" | "host";
  image: string;
  socials?: SocialLinks
}

export interface AgendaItem {
  date: string;
  time: string;
  title: string;
  highlights?: string;
  icon: React.ElementType;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  features?: string[];
  active: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventData {
  eventDetails: EventDetails;
  speakers: Speaker[];
  agenda: AgendaItem[];
  pricing: PricingTier[];
  faq: FaqItem[];
}

export interface SectionProps {
  title: string;
  data: any[];
  children: React.ReactNode;
  className?: string;
}