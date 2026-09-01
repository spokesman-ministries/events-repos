import React from 'react';
import Countdown from './Countdown';
// Assuming you have a Countdown component in the same directory

const HomePage = () => {
    const eventDate = "2026-07-23T08:00:00"; // Based on Wed 23rd July 2026

    return (
        <section className="relative w-full overflow-hidden bg-slate-950 text-white py-16 px-4">
            {/* Background Decorative Element - Hinting at "Enlarge & Expand" */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Branding & Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
                                19th International Leadership Conference
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase italic">
                            Break <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                Forth
                            </span>
                        </h1>

                        <div className="inline-block bg-white/10 backdrop-blur-md border-l-4 border-orange-500 p-4">
                            <p className="text-xl font-medium tracking-wide uppercase italic">
                                Enlarge and Expand on all sides
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 text-slate-300">
                            <div className="flex items-start space-x-3">
                                <span className="font-bold text-white">DATE:</span>
                                <span>Wed. 23rd - Sun. 26th July 2026</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="font-bold text-white">VENUE:</span>
                                <span>Hope Auditorium, Ife-Ibadan Expressway, Ile-Ife, Nigeria.</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="font-bold text-white">HOSTS:</span>
                                <span>Rev. Prof. Gregory & Rev. Mrs. Ayodele Erhabor</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <a
                                href="/register"
                                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 transition-colors font-bold uppercase tracking-widest text-sm"
                            >
                                Register Now
                            </a>
                            {/* <button className="px-8 py-4 border border-white/30 hover:bg-white/10 transition-colors font-bold uppercase tracking-widest text-sm">
                                Add to Calendar
                            </button> */}
                        </div>
                    </div>

                    {/* Right Column: Timer & Online Access */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-center text-xl font-semibold mb-6 uppercase tracking-widest">
                            Counting Down To Breaking Forth
                        </h3>

                        {/* Your existing Countdown Component */}
                        <div className="container mx-auto px-4 text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-12">
                                Countdown to Event
                            </h3>
                            <Countdown />
                        </div>

                        <div className="border-t border-white/10 pt-8 mt-8">
                            <h4 className="text-orange-400 font-bold text-center mb-4 uppercase text-xs tracking-widest">
                                Join Us Online
                            </h4>
                            <div className="bg-black/40 p-6 rounded-xl text-center">
                                <p className="text-sm text-slate-400 mb-2 font-mono uppercase">Zoom Credentials</p>
                                <div className="text-lg font-bold space-y-1">
                                    <p>ID: <span className="text-orange-400">220 071 5116</span></p>
                                    <p>Passcode: <span className="text-orange-400">123456</span></p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-6 grayscale opacity-60 hover:grayscale-0 transition-all">
                                {/* Social Icons Placeholder */}
                                <span className="text-xs">@sanctuaryofhopechurch</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomePage;