'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import {
    ArrowLeft, Twitter, Youtube, Linkedin, Instagram,
    Globe, Facebook, ArrowUpRight, ShieldCheck,
    Crown
} from 'lucide-react';
import { Speaker } from '@/libs/types';


interface SpeakerProfileProps {
    speaker: Speaker;
    meetingLink: string;
}

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function SpeakerProfile({ speaker, meetingLink }: SpeakerProfileProps) {
    const router = useRouter();
    const { scrollY } = useScroll();
    const imgY = useTransform(scrollY, [0, 600], [0, 90]);

    const nameParts = speaker.name?.split(' ') ?? ['Speaker'];

    return (
        <div className="min-h-screen bg-[#F5EEE4] font-sans text-[#111010] overflow-x-hidden relative">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Nav */}
            <nav className="fixed top-0 inset-x-0 z-50 p-7 flex items-center pointer-events-none">
                <button
                    className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 bg-[#111010]/75 backdrop-blur-md border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#C8821A] transition-all group"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Left: Image Panel */}
                <div className="relative h-[70vh] md:h-screen sticky top-0 overflow-hidden bg-[#181411]">
                    <motion.div style={{ y: imgY }} className="absolute inset-0">
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover object-top opacity-70 saturate-[0.85]"
                        />
                    </motion.div>

                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#C8821A]/30 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111010]/50 via-transparent to-transparent z-10" />

                    {/* Vertical Year Stamp */}
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 whitespace-nowrap z-20">
                        {speaker.type === 'host' ? 'Host' : 'Guest'} Speaker · 2026
                    </span>

                    {/* ✅ Unified bottom container — replaces both the Dignitary Badge and Mobile Name Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col gap-4">

                        {/* Name: mobile only */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-4xl text-white font-bold leading-tight md:hidden"
                        >
                            {speaker.name}
                        </motion.h1>

                        {/* Dignitary Badge: always visible */}
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl shadow-2xl transition-colors duration-500 ${speaker.type === 'host'
                                    ? 'bg-slate-800 shadow-slate-900/50 border border-white/10'
                                    : 'bg-[#C8821A] shadow-amber-900/50'
                                }`}>
                                {speaker.type === 'host' ? (
                                    <Crown className="text-[#E8A030] w-6 h-6" />
                                ) : (
                                    <ShieldCheck className="text-white w-6 h-6" />
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${speaker.type === 'host' ? 'text-white' : 'text-[#E8A030]'
                                    }`}>
                                    {speaker.type === 'host' ? 'Executive Host' : 'Guest of Honor'}
                                </span>
                                <span className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-medium mt-0.5">
                                    {speaker.type === 'host' ? 'Conference Leadership' : 'ILCON 2026'}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right: Content Panel */}
                <div className="bg-[#F5EEE4] px-6 py-16 md:px-20 md:py-32 flex flex-col justify-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="max-w-xl"
                    >
                        {/* Eyebrow */}
                        <motion.div className="flex items-center gap-4 mb-8" variants={itemVariants}>
                            <div className="w-8 h-[1px] bg-[#C8821A]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8821A]">
                                {speaker.type === 'host' ? 'Host' : 'Guest'} Speaker 2026
                            </span>
                        </motion.div>

                        {/* Desktop Name */}
                        <motion.div className="mb-6 hidden md:block" variants={itemVariants}>
                            <h1 className="font-serif text-6xl lg:text-8xl leading-[0.9] tracking-tighter">
                                <span className="block font-light text-[#111010]">
                                    {nameParts.slice(0, -1).join(' ')}
                                </span>
                                <span className="block font-bold italic text-[#C8821A]">
                                    {nameParts[nameParts.length - 1]}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Role */}
                        <motion.p className="text-sm md:text-base text-[#7E7265] leading-relaxed mb-10 max-w-sm" variants={itemVariants}>
                            {speaker.role}
                        </motion.p>

                        <div className="w-full h-[1px] bg-[#111010]/10 my-9" />

                        {/* Bio */}
                        <motion.div variants={itemVariants}>
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#7E7265] mb-4">Biography</p>
                            <p className="font-serif text-lg md:text-xl italic text-[#2C241C] leading-relaxed pl-6 border-l-2 border-[#C8821A]">
                                {speaker.bio}
                            </p>
                        </motion.div>

                        <div className="w-full h-[1px] bg-[#111010]/10 my-9" />

                        {/* Socials */}
                        <motion.div variants={itemVariants}>
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#7E7265] mb-4">Connect</p>
                            <div className="flex flex-wrap gap-2">
                                {speaker.socials && Object.entries(speaker.socials).map(([platform, url]) => (
                                    url && <SocialPill key={platform} platform={platform} href={url} />
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div className="mt-12 group" variants={itemVariants}>
                            <a
                                href={meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between gap-12 pl-8 pr-3 py-3 bg-[#111010] text-white rounded-full transition-all hover:shadow-[0_20px_50px_-10px_rgba(200,130,26,0.4)] relative overflow-hidden"
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-[#E8A030] opacity-75"></span>
                                        <span className="relative rounded-full h-2 w-2 bg-[#E8A030]"></span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Join Live Session</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C8821A] transition-colors relative z-10">
                                    <ArrowUpRight size={18} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </a>
                            <div className="mt-4 flex items-center gap-3 pl-4">
                                <div className="w-6 h-[1px] bg-[#111010]/10" />
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#7E7265]">Real-time Broadcast</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function SocialPill({ platform, href }: { platform: string; href: string }) {
    const icons: Record<string, any> = {
        twitter: Twitter,
        linkedin: Linkedin,
        facebook: Facebook,
        youtube: Youtube,
        instagram: Instagram,
        website: Globe
    };
    const Icon = icons[platform] || Globe;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#111010]/10 rounded-full text-[#7E7265] text-[10px] font-bold hover:text-[#C8821A] hover:border-[#C8821A] hover:bg-[#C8821A]/5 transition-all hover:-translate-y-0.5"
        >
            <Icon size={12} />
            <span className="capitalize">{platform}</span>
        </a>
    );
}