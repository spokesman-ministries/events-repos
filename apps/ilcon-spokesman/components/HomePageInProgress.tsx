'use client'
// ─────────────────────────────────────────────────────────────────────────────
// Add these to your root layout.tsx <head> for the Break Forth brand fonts:
//
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Sparkles, MapPin, X, Check, ChevronDown, ArrowRight,
  Crown, Instagram, Globe, Linkedin, Twitter, Youtube, Play,
} from 'lucide-react';
import Link from 'next/link';
import { SectionProps, Speaker } from '@/libs/types';
import eventData from '@/libs/data';

// ── Design tokens ─────────────────────────────────────────────────────────────
// Navy (primary dark):  #061338
// Cyan (accent):        #00C8FF
// Yellow (CTA):         #FFD600
// Muted navy text:      #3A5580
// Light cyan tint:      #E8F8FF
// Alt section bg:       #F5F8FF
// ─────────────────────────────────────────────────────────────────────────────

const DISPLAY_FONT = "'Oswald', 'Arial Narrow', sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// ── Shared section wrapper ────────────────────────────────────────────────────
const Section: React.FC<SectionProps> = ({ title, data, children, className = "" }) => {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  return (
    <section
      className={`py-24 px-6 md:px-12 w-full flex justify-center ${className}`}
      style={{ fontFamily: BODY_FONT }}
    >
      <div className="max-w-6xl w-full">
        <div className="flex flex-col items-center mb-16">
          <span className="block w-10 h-1 rounded-full bg-[#00C8FF] mb-5" />
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#061338] tracking-tight text-center"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};

const SummarySection = () => {
  return (
    <section 
      className="relative py-24 bg-slate-50 overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 200, 255, 0.06) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(0, 200, 255, 0.05) 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, rgba(6, 19, 56, 0.03) 0%, transparent 50%)
        `
      }}
    >
      {/* Container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Content Card with subtle glassmorphism */}
        <div className="text-center space-y-8 bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-white/50 shadow-sm">
          <h2 
            className="text-4xl md:text-5xl font-bold text-[#061338] tracking-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            A Call to Transformational Leadership
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The world today faces an urgent need for visionary leaders who not only know 
            the way but show the way. ILCON 2026 is a clarion call to rise, embrace 
            integrity, and align our purpose with the sovereign leadership of God.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/intro" 
              className="group flex items-center gap-2 text-[#061338] font-bold text-lg border-b-2 border-[#061338] hover:text-[#00C8FF] hover:border-[#00C8FF] transition-all duration-300"
            >
              Read the Full Invitation 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomePageInProgress() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency', currency: 'NGN',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);

  const YT_ID = 'BAHuzKV9BEo';
  const YT_THUMB = `https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`;
  const YT_EMBED = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: BODY_FONT }}>

      {/* ── HERO (navy) ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#061338]">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: 'radial-gradient(circle, #00C8FF 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00C8FF]/10 blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#FFD600]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-white"
          >
            <div
              className="inline-flex items-center gap-2 bg-[#00C8FF]/15 border border-[#00C8FF]/30 text-[#00C8FF] text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
              style={{ fontFamily: BODY_FONT }}
            >
              19th International Leadership Conference
            </div>

            <h1
              className="text-6xl md:text-7xl xl:text-8xl font-bold leading-none tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-[#8BACD4]"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {eventData.eventDetails.name}
            </h1>

            <div className="w-20 h-1.5 bg-[#FFD600] rounded-full mb-6" />

            <p className="text-xl text-[#8BACD4] font-medium mb-10 max-w-md leading-relaxed">
              {eventData.eventDetails.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center gap-2.5 text-white/80 text-base font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00C8FF]/15">
                  <Calendar className="w-4 h-4 text-[#00C8FF]" />
                </span>
                {eventData.eventDetails.date}
              </div>
              <div className="flex items-center gap-2.5 text-white/80 text-base font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00C8FF]/15">
                  <MapPin className="w-4 h-4 text-[#00C8FF]" />
                </span>
                {eventData.eventDetails.location}
              </div>
            </div>

            <a
              href={eventData.eventDetails.registrationLink}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD600] hover:bg-[#FFE033] text-[#061338] rounded-full font-black text-lg transition-all duration-200 shadow-[0_8px_30px_rgba(255,214,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,214,0,0.4)] hover:-translate-y-1"
              style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.04em' }}
            >
              Register Now <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Right — YouTube Short in phone frame */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 flex flex-col items-center gap-5"
          >
            {/* Phone shell */}
            <div
              className="relative bg-black rounded-[2.8rem] overflow-hidden"
              style={{
                width: '264px',
                height: '528px',
                boxShadow: '0 0 0 5px rgba(255,255,255,0.10), 0 0 0 6px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 pointer-events-none" />

              {!videoPlaying ? (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label="Play video"
                >
                  <img
                    src={YT_THUMB}
                    alt="Watch: Christ Is Not An Option — Rev. Prof. Greg Erhabor"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#061338]/45 group-hover:bg-[#061338]/30 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD600] shadow-[0_0_30px_rgba(255,214,0,0.5)] group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-7 h-7 text-[#061338] fill-[#061338] ml-1" />
                    </div>
                  </div>
                  {/* Caption pill */}
                  <div className="absolute bottom-10 left-3 right-3">
                    <div className="bg-[#061338]/80 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                      <p className="text-white text-xs font-semibold leading-snug">
                        Rev. Prof. Greg Erhabor
                      </p>
                      <p className="text-[#00C8FF] text-[10px] mt-0.5">
                        "Christ Is Not An Option"
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  src={YT_EMBED}
                  title="Break Forth — Rev. Prof. Greg Erhabor"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              )}
            </div>

            <p className="text-[#8BACD4] text-sm text-center max-w-[240px] leading-relaxed">
              Hosted by{' '}
              <span className="text-white font-semibold">
                Rev. Prof. Gregory &amp; Rev. Mrs Ayodele Erhabor
              </span>
            </p>
          </motion.div>

        </div>


      </header>
      <SummarySection />

      {/* ── SPEAKERS (white) ─────────────────────────────────────────────────── */}
      <Section title="Featured Speakers" data={eventData.speakers} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventData.speakers.map((speaker) => (
            <Link href={`/speakers/${speaker.slug}`} key={speaker.id}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-[#00C8FF]/50 shadow-sm hover:shadow-xl hover:shadow-[#061338]/10 transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#F5F8FF] relative">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className=" w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105 brightness-100 group-hover:brightness-110 group-hover:contrast-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00C8FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
                <div className="p-6 border-l-4 border-transparent group-hover:border-[#FFD600] transition-colors duration-300">
                  <h3
                    className="text-xl font-bold text-[#061338] mb-1"
                    style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.02em' }}
                  >
                    {speaker.name}
                  </h3>
                  <p className="text-[#00C8FF] font-medium text-sm">{speaker.role}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── SCHEDULE (light tint) ────────────────────────────────────────────── */}
      <Section title="Conference Schedule" data={eventData.agenda} className="bg-[#F5F8FF]">
        <div className="max-w-4xl mx-auto space-y-6 relative
          before:absolute before:inset-0
          before:ml-4 md:before:ml-[11.5rem]
          before:-translate-x-px md:before:translate-x-0
          before:h-full before:w-0.5
          before:bg-gradient-to-b before:from-[#00C8FF] before:via-[#00C8FF]/40 before:to-transparent">
          {eventData.agenda.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="flex flex-col md:items-end md:w-40 shrink-0 mt-1">
                  <div className="absolute left-4 md:left-[11.5rem] -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#00C8FF]/30 flex items-center justify-center group-hover:border-[#00C8FF] transition-colors z-10 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00C8FF]" />
                  </div>
                  <span
                    className="ml-12 md:ml-0 text-[#061338] font-bold tracking-tight"
                    style={{ fontFamily: DISPLAY_FONT }}
                  >
                    {item.date}
                  </span>
                  <span className="ml-12 md:ml-0 text-[#00C8FF] font-semibold text-sm">{item.time}</span>
                </div>
                <div className="ml-12 md:ml-0 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1 flex items-center gap-4 group-hover:border-[#00C8FF]/40 group-hover:shadow-md transition-all">
                  <div className="p-3 bg-[#E8F8FF] text-[#00C8FF] rounded-xl shrink-0 group-hover:bg-[#061338] group-hover:text-[#FFD600] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#061338]"
                      style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.02em' }}
                    >
                      {item.title}
                    </h3>
                    {item.highlights && (
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {item.highlights}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── PRICING (white) ──────────────────────────────────────────────────── */}
      <Section title="Registration Categories" data={eventData.pricing} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {eventData.pricing.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-8 md:p-10 rounded-2xl flex flex-col transition-all duration-300 ${tier.active
                  ? 'bg-[#061338] text-white shadow-2xl shadow-[#061338]/20 md:scale-105 z-10'
                  : 'bg-white text-[#061338] border border-slate-200 hover:border-[#00C8FF]/50 hover:shadow-lg'
                }`}
            >
              
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.04em' }}
              >
                {tier.name}
              </h3>
              <div
                className={`text-4xl font-black mb-8 ${tier.active ? 'text-[#FFD600]' : 'text-[#061338]'}`}
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {formatCurrency(tier.price)}
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {tier.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`p-1 rounded-full shrink-0 mt-0.5 ${tier.active ? 'bg-[#00C8FF]/20 text-[#00C8FF]' : 'bg-[#E8F8FF] text-[#00C8FF]'
                      }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className={`text-sm leading-tight ${tier.active ? 'text-[#8BACD4]' : 'text-[#3A5580]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={eventData.eventDetails.registrationLink}
                className={`w-full py-4 text-center rounded-xl font-black text-base transition-all ${tier.active
                    ? 'bg-[#FFD600] hover:bg-[#FFE033] text-[#061338] hover:-translate-y-0.5 shadow-lg shadow-[#FFD600]/20'
                    : 'bg-[#061338] hover:bg-[#0A1D4A] text-white'
                  }`}
                style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.06em' }}
              >
                Select Category
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ (light tint) ─────────────────────────────────────────────────── */}
      <Section title="Frequently Asked Questions" data={eventData.faq} className="bg-[#F5F8FF]">
        <div className="max-w-3xl mx-auto space-y-3">
          {eventData.faq.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200 ${openFaq === index
                  ? 'bg-white border-[#00C8FF]/50 shadow-md'
                  : 'bg-white border-slate-200 hover:border-[#00C8FF]/40 hover:shadow-sm'
                }`}
            >
              <div className="p-6 flex justify-between items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${openFaq === index ? 'bg-[#00C8FF]' : 'bg-[#061338]/20'}`} />
                  <h3
                    className="text-base font-bold text-[#061338]"
                    style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.02em' }}
                  >
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-all duration-300 ${openFaq === index ? 'rotate-180 text-[#00C8FF]' : 'text-[#061338]/40'
                    }`}
                />
              </div>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 text-[#3A5580] leading-relaxed border-t border-slate-100 pt-4 ml-5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#061338] text-[#5A7BAF] py-14 border-t border-[#1E3A6E]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
          {/* Sunburst color bar (echoes the logo) */}
          <div className="flex gap-1 mb-2">
            {['#3CB371', '#40B4B4', '#FFD600', '#F0A500', '#00C8FF'].map((c) => (
              <span key={c} className="block w-8 h-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <p
            className="text-2xl font-bold text-white"
            style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.04em' }}
          >
            {eventData.eventDetails.name}
          </p>
          <p className="text-sm">© 2026 {eventData.eventDetails.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* ── STICKY CTA ───────────────────────────────────────────────────────── */}
      <a
        href={eventData.eventDetails.registrationLink}
        className="fixed bottom-8 right-8 z-40 px-6 py-3.5 bg-[#FFD600] hover:bg-[#FFE033] text-[#061338] rounded-2xl font-black shadow-2xl shadow-[#FFD600]/25 hover:shadow-[#FFD600]/35 transition-all hover:-translate-y-1 flex items-center gap-2"
        style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.05em' }}
      >
        Register Now
      </a>

      {/* ── SPEAKER MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#061338]/70 backdrop-blur-sm"
            onClick={() => setSelectedSpeaker(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Yellow top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD600]" />

              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-[#061338] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="sm:w-2/5 aspect-square sm:aspect-auto bg-[#F5F8FF] shrink-0">
                <img
                  src={selectedSpeaker.image}
                  alt={selectedSpeaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <h3
                  className="text-3xl font-black text-[#061338] mb-1"
                  style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.02em' }}
                >
                  {selectedSpeaker.name}
                </h3>
                <p className="text-[#00C8FF] font-bold mb-5">{selectedSpeaker.role}</p>
                <div className="w-12 h-1 bg-[#FFD600] rounded-full mb-5" />
                <p className="text-[#3A5580] leading-relaxed">{selectedSpeaker.bio}</p>

                {selectedSpeaker.socials && (
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                    {selectedSpeaker.socials.facebook && (
                      <a href={selectedSpeaker.socials.facebook} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials.youtube && (
                      <a href={selectedSpeaker.socials.youtube} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials.twitter && (
                      <a href={selectedSpeaker.socials.twitter} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials.linkedin && (
                      <a href={selectedSpeaker.socials.linkedin} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials.instagram && (
                      <a href={selectedSpeaker.socials.instagram} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials.website && (
                      <a href={selectedSpeaker.socials.website} target="_blank" rel="noreferrer"
                        className="p-2 bg-[#F5F8FF] hover:bg-[#E8F8FF] text-[#3A5580] hover:text-[#00C8FF] rounded-full transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}