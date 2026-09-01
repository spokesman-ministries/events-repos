import eventData from '@/libs/data';
import SpeakerProfile from '@/components/SpeakerProfile';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Ensure your speaker objects in libs/data have a .slug property
  return eventData.speakers.map((speaker) => ({
    slug: speaker.slug, 
  }));
}

// Params is a Promise in newer Next.js versions
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Destructure after awaiting
  
  const speaker = eventData.speakers.find(s => s.slug === slug);

  // Debugging: This will show up in your terminal, not the browser console
  console.log("Rendering page for slug:", slug); 

  if (!speaker) {
    notFound();
  }

  return (
    <SpeakerProfile 
      speaker={speaker} 
      meetingLink={eventData.eventDetails.meetingLinks?.zoom || '#'} // Pass the Zoom link or a fallback   
    />
  );
}