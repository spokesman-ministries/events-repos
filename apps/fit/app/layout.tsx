import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fit.spokesmancom.org";

const TITLE =
  "FIT 2026 | SSOH Lagos FIT-5 Annual Leadership Conference | Spokesmancom FIT 2026";
const DESCRIPTION =
  "Register for FIT 2026 — Spokesmancom FIT 2026, the SSOH Lagos FIT-5 Annual Leadership Conference: 'FIT and Fired for Exploits' (Daniel 11:32). Sat 26th - Sun 27th September 2026 at Lakehamm Residence, GRA, Ikeja, Lagos, with keynote speaker Rev. Prof. Gregory Efosa Erhabor. Reserve your seat now.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "FIT 2026",
    "Spokesmancom FIT 2026",
    "FIT-5",
    "SSOH Lagos FIT-5",
    "FIT and Fired for Exploits",
    "SSOH Lagos",
    "Spokesman Sanctuary of Hope Church",
    "Greg Erhabor Ministries International",
    "Greg Erhabor Leadership and Training Institute",
    "Rev Prof Gregory Efosa Erhabor",
    "Lagos leadership conference 2026",
    "Ikeja church conference",
  ],
  authors: [{ name: "Spokesman Sanctuary of Hope Church, Lagos" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "FIT 2026 — Spokesmancom",
    images: [
      {
        url: "/images/fit-2026-flyer.jpg",
        width: 1200,
        height: 1200,
        alt: "FIT 2026 - SSOH Lagos FIT-5 Annual Leadership Conference flyer",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/fit-2026-flyer.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "FIT 2026 — SSOH Lagos FIT-5 Annual Leadership Conference: FIT and Fired for Exploits",
  description: DESCRIPTION,
  startDate: "2026-09-26T09:00:00+01:00",
  endDate: "2026-09-27T12:00:00+01:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Lakehamm Residence",
    address: {
      "@type": "PostalAddress",
      streetAddress: "23 Oladipo Bateye, GRA",
      addressLocality: "Ikeja",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
  },
  image: [`${SITE_URL}/images/fit-2026-flyer.jpg`],
  organizer: [
    {
      "@type": "Organization",
      name: "Spokesman Sanctuary of Hope Church",
      url: SITE_URL,
    },
    {
      "@type": "Organization",
      name: "Greg Erhabor Ministries International",
    },
    {
      "@type": "Organization",
      name: "Greg Erhabor Leadership & Training Institute",
    },
  ],
  performer: {
    "@type": "Person",
    name: "Rev. Prof. Gregory Efosa Erhabor",
  },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/`,
    price: "0",
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
