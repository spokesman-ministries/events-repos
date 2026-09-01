import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold text-sm tracking-wide">
            19TH EDITION
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            ILCON <span className="text-blue-600">2026</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-500 leading-snug">
            “BREAKFORTH, ENLARGE, AND EXPAND ON ALL SIDES”
          </p>
          <div className="pt-4">
            <a href="/register" className="bg-slate-900 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-600 transition-colors">
              Register Now
            </a>
          </div>
        </div>

        {/* Right: Portrait & Info Card */}
        <div className="relative">
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Replace with your actual image path */}
            <img 
              src="/images/gregerhabor-2.JPG" 
              alt="Rev. Prof. Gregory E. Erhabor" 
              width={600} 
              height={700}
              className="object-cover w-full h-[500px]"
            />
          </div>
          {/* Decorative background shape */}
          <div className="absolute -top-6 -right-6 w-full h-full border-4 border-blue-200 rounded-[2rem] -z-0"></div>
        </div>
      </section>

      {/* Modern Text Block */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-100">
        <h2 className="text-4xl font-bold mb-10 text-slate-900">A Call to Transformational Leadership</h2>

{/* Main Content Area */}
      <article className="space-y-8 text-xl text-slate-800 leading-relaxed">
        <p>
          It is my great pleasure to invite you to the 19th edition of the International Leadership Conference, 
          organised by the Greg Erhabor Leadership and Training Institute (GELTI) in partnership 
          with Spokesman Sanctuary of Hope Church.
        </p>

        <p>
          The world today faces an urgent need for transformational leaders. This is a clarion call 
          for every individual to rise and embrace the responsibility of leadership. 
          True leadership begins with self-leadership—the willingness to take personal 
          responsibility, cultivate integrity, and positively influence others.
        </p>

        <div className="bg-slate-900 text-white p-10 rounded-3xl my-12">
          <p className="text-3xl font-serif italic mb-4">
            "A leader is one who knows the way, goes the way, and then shows the way."
          </p>
          <p className="text-blue-400 font-medium">— Rev. Prof. Gregory E. Erhabor</p>
        </div>

        <p>
          Authentic leadership is ultimately rooted in recognizing, accepting, and submitting 
          to the sovereign leadership of God. When we allow God to shape our character and 
          direct our purpose, we become leaders who inspire hope and leave a lasting legacy.
        </p>

        <p>
          This conference is designed to equip, encourage, and energize you to navigate your 
          leadership journey towards effectiveness, empowering you to advance frontiers 
          irrespective of prevailing limitations.
        </p>
      </article>

      {/* Action Section */}
      <section className="mt-20 text-center">
        <p className="text-lg text-slate-500 mb-8">
          Join us at the Hope Auditorium, Ife-Ibadan Expressway, Ile-Ife.<br />
          Wednesday 22nd – Sunday 26th July, 2026.
        </p>
        
        <a 
          href="/register" 
          className="inline-block bg-blue-600 text-white text-xl px-12 py-5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
        >
          Confirm Your Participation
        </a>
      </section>
      </section>
      
    </main>
  );
}