import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export default function FitHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top right, #fbb63c 0%, #f4772a 45%, #fdeee0 100%)",
      }}
    >
      {/* soft texture glows to echo the flyer's warm gradient */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1/3"
        style={{ background: "linear-gradient(to top, #fdf1e2, transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* Organizer lockup */}
        <div className="text-center mb-6">
          <p className="text-white/90 text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] mb-1">
            Greg Erhabor Ministries International &bull; Greg Erhabor Leadership &amp; Training
            Institute &bull; Spokesman Sanctuary of Hope Church, Lagos
          </p>
          <p className="text-white text-xs font-semibold uppercase tracking-widest">Presents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: headline + details */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <span
              className="inline-block text-xs md:text-sm font-black px-4 py-2 rounded-md uppercase tracking-wide mb-4"
              style={{ background: "linear-gradient(90deg,#f5a623,#f26522)", color: "#fff" }}
            >
              SSOH Lagos FIT-5 Annual Leadership Conference
            </span>

            <h1
              className="font-black uppercase leading-[0.95] mb-3"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--fit-maroon)",
              }}
            >
              FIT and Fired
              <br />
              for{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#e11d2e,#f26522)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Exploits
              </span>
            </h1>

            <p className="text-white font-bold text-sm md:text-base mb-1">
              &mdash; Daniel 11:32
            </p>

            <p className="text-white/95 font-semibold text-base md:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
              Join us for <strong>FIT 2026</strong>, Spokesmancom FIT 2026 &mdash; two days of
              impartation, fire and leadership exploits with keynote speaker{" "}
              <strong>Rev. Prof. Gregory Efosa Erhabor</strong>.
            </p>

            {/* Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0 mb-8">
              <div className="flex items-start gap-3 bg-white/90 backdrop-blur rounded-xl p-4 text-left">
                <Calendar className="mt-0.5 shrink-0" size={20} style={{ color: "var(--fit-red)" }} />
                <div>
                  <p className="text-[11px] uppercase font-bold text-gray-500">Dates</p>
                  <p className="font-bold text-sm" style={{ color: "var(--fit-maroon)" }}>
                    Sat 26th &ndash; Sun 27th September 2026
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/90 backdrop-blur rounded-xl p-4 text-left">
                <MapPin className="mt-0.5 shrink-0" size={20} style={{ color: "var(--fit-red)" }} />
                <div>
                  <p className="text-[11px] uppercase font-bold text-gray-500">Venue</p>
                  <p className="font-bold text-sm" style={{ color: "var(--fit-maroon)" }}>
                    Lakehamm Residence, 23 Oladipo Bateye, GRA, Ikeja, Lagos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/90 backdrop-blur rounded-xl p-4 text-left sm:col-span-2">
                <Clock className="mt-0.5 shrink-0" size={20} style={{ color: "var(--fit-red)" }} />
                <div>
                  <p className="text-[11px] uppercase font-bold text-gray-500">Schedule</p>
                  <p className="font-bold text-sm" style={{ color: "var(--fit-maroon)" }}>
                    Sat: FIT Conference &mdash; 9:00AM&ndash;12:30PM &amp; 1:00PM&ndash;4:00PM
                    &nbsp;|&nbsp; Sun: Sunday Service &mdash; 9:00AM
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#register"
              className="inline-flex items-center gap-3 px-8 py-4 font-black text-lg rounded-xl transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "#ffffff",
                color: "var(--fit-red)",
                fontFamily: "var(--font-poppins)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              Register Now
              <ArrowRight size={20} />
            </a>
          </div>

          {/* RIGHT: speaker */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className="relative w-56 h-64 md:w-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: "5px solid white" }}
            >
              <img
                src="/images/rev-prof-gregory-erhabor.jpg"
                alt="Rev. Prof. Gregory Efosa Erhabor, keynote speaker at FIT 2026"
                className="w-full h-full object-cover"
              />
              <span
                className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-black uppercase tracking-widest py-1.5"
                style={{ background: "var(--fit-red)", color: "#fff" }}
              >
                Keynote Speaker
              </span>
            </div>
            <h3
              className="mt-4 text-lg md:text-xl font-black text-center"
              style={{ fontFamily: "var(--font-poppins)", color: "#fff" }}
            >
              Rev. Prof. Gregory Efosa Erhabor
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
