import FitHero from "@/components/FitHero";
import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--fit-cream)" }}>
      <FitHero />

      <section className="py-14 md:py-20">
        <RegistrationForm />
      </section>

      <footer className="py-8 border-t" style={{ borderColor: "var(--fit-cream-dark)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-gray-500 space-y-1">
          <p className="font-bold" style={{ color: "var(--fit-maroon)" }}>
            SSOH Lagos FIT-5 Annual Leadership Conference &mdash; FIT 2026
          </p>
          <p>
            Greg Erhabor Ministries International &bull; Greg Erhabor Leadership &amp; Training
            Institute &bull; Spokesman Sanctuary of Hope Church, Lagos, Nigeria
          </p>
          <p>Inquiries: Ademola &mdash; 08053321190 &nbsp;|&nbsp; Justina &mdash; 07032121216</p>
        </div>
      </footer>
    </main>
  );
}
