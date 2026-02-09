'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Utensils, Award, ChevronRight, Clock, Zap, Bot, Plane, Trophy } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

export default function Landing() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const events = [
        {
            icon: Zap,
            title: 'Srinathon',
            desc: '24-Hour Flagship Hackathon',
            highlight: true,
        },
        {
            icon: Bot,
            title: 'Robo Race',
            desc: 'Build. Race. Conquer.',
        },
        {
            icon: Plane,
            title: 'Aero Events',
            desc: 'Take Flight with Innovation',
        },
        {
            icon: Trophy,
            title: 'More Events',
            desc: 'Workshops, Talks & More!',
        },
    ];

    const schedule = [
        { time: '09:00 AM', event: 'Check-in & Breakfast', type: 'START' },
        { time: '10:30 AM', event: 'Opening Ceremony', type: 'STAGE' },
        { time: '12:00 PM', event: 'Srinathon Begins!', type: 'HACK' },
        { time: '01:00 PM', event: 'Lunch Served', type: 'FOOD' },
        { time: '06:00 PM', event: 'Robo Race Qualifiers', type: 'RACE' },
    ];

    return (
        <Layout user={user} onLogout={logout}>
            {/* ========== HERO SECTION - THE RONIN'S SCROLL ========== */}
            <section className="block-crimson relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Background Kanji Decoration */}
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden">
                    <span className="absolute -left-20 top-1/2 -translate-y-1/2 font-mega text-[40rem] text-[#080808] opacity-[0.06] select-none">
                        武
                    </span>
                    <span className="absolute right-10 bottom-10 font-mega text-[20rem] text-[#080808] opacity-[0.04] select-none">
                        道
                    </span>
                </div>

                {/* Halftone Pattern Overlay */}
                <div className="absolute inset-0 pattern-halftone opacity-[0.03]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">

                        {/* LEFT COLUMN - Vertical Text */}
                        <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
                            <div className="text-vertical h-[500px] flex items-center">
                                <h2 className="font-mega text-6xl xl:text-7xl text-[#EFE6D5] tracking-widest opacity-80">
                                    NEXOTHSAV
                                </h2>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Main Content */}
                        <div className="lg:col-span-9">
                            {/* Stamp Badge */}
                            <div className="stamp-effect inline-block mb-8">
                                <span className="font-header text-sm text-[#EFE6D5]">⚔️ ARENA OPEN</span>
                            </div>

                            {/* MEGA HEADLINE */}
                            <h1 className="font-mega text-5xl sm:text-6xl lg:text-8xl xl:text-9xl text-[#EFE6D5] leading-[0.85] mb-8">
                                THE RONIN'S
                                <br />
                                <span className="text-stroke text-[#080808]">SCROLL</span>
                            </h1>

                            {/* Description Block - Monospace justified text */}
                            <div className="card-ronin p-6 max-w-2xl mb-8 offset-left">
                                <p className="font-body text-sm text-[#EFE6D5] leading-relaxed text-justify">
                                    Experience Srinathon, our flagship 24-hour hackathon where
                                    innovation meets creativity. Join warriors from across the
                                    land for Robo Race, Aero Events, and countless more
                                    challenges. Your path to glory begins here.
                                </p>
                                <div className="mt-4 flex items-center gap-4 font-body text-xs text-[#4A7A7A]">
                                    <span>24 HOURS</span>
                                    <span className="text-[#EFE6D5]">•</span>
                                    <span>MULTIPLE TRACKS</span>
                                    <span className="text-[#EFE6D5]">•</span>
                                    <span>GLORY AWAITS</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="btn-ronin btn-ronin-jade"
                                >
                                    Enter the Arena <ChevronRight className="w-5 h-5" />
                                </button>
                                <a
                                    href="#events"
                                    className="btn-ronin btn-ronin-ghost"
                                >
                                    View All Events
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jagged Ink Divider */}
            <div className="divider-ink-jagged bg-[#080808]"></div>

            {/* ========== EVENTS SECTION - INK BLACK ========== */}
            <section id="events" className="block-ink py-20 sm:py-28 relative">
                {/* Subtle line pattern */}
                <div className="absolute inset-0 pattern-lines"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header - Asymmetric */}
                    <div className="mb-16 offset-right">
                        <span className="font-header text-sm text-[#4A7A7A] tracking-widest">// BATTLES AWAIT</span>
                        <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-[#EFE6D5] mt-2">
                            OUR EVENTS
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event, idx) => (
                            <div
                                key={idx}
                                className={`card-ronin-cream p-6 transition-transform hover:-translate-y-1 ${event.highlight ? 'ring-4 ring-[#C91B1A] transform -rotate-1' : ''
                                    }`}
                            >
                                <div className="w-14 h-14 bg-[#2F5C5C] border-3 border-[#080808] flex items-center justify-center mb-4">
                                    <event.icon className="w-7 h-7 text-[#EFE6D5]" />
                                </div>
                                <h3 className="font-header text-xl text-[#080808] mb-2">
                                    {event.title}
                                </h3>
                                <p className="font-body text-[#080808] text-sm opacity-70">
                                    {event.desc}
                                </p>
                                {event.highlight && (
                                    <span className="badge-ronin-crimson mt-4 inline-block">
                                        Flagship
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cream Jagged Divider */}
            <div className="divider-cream-jagged bg-[#C91B1A]"></div>

            {/* ========== SCHEDULE SECTION - CRIMSON ========== */}
            <section id="schedule" className="block-crimson py-20 sm:py-28 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-16 offset-left">
                        <span className="font-header text-sm text-[#080808] tracking-widest">// TIMELINE</span>
                        <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-[#EFE6D5] mt-2">
                            BATTLE SCHEDULE
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {schedule.map((item, idx) => (
                            <div
                                key={idx}
                                className="card-ronin p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:translate-x-2 transition-transform"
                            >
                                <div className="flex items-center gap-3 sm:min-w-[140px]">
                                    <Clock className="w-5 h-5 text-[#4A7A7A]" />
                                    <span className="font-header text-[#4A7A7A]">{item.time}</span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-header text-lg text-[#EFE6D5]">{item.event}</h4>
                                </div>
                                <span className="badge-ronin-jade self-start sm:self-auto">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ink Divider */}
            <div className="divider-ink-jagged bg-[#080808]"></div>

            {/* ========== CTA SECTION - INK BLACK ========== */}
            <section className="block-ink py-20 sm:py-28 relative">
                <div className="absolute inset-0 pattern-halftone opacity-[0.05]"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-[#EFE6D5] mb-6">
                        READY FOR BATTLE?
                    </h2>
                    <p className="font-body text-lg text-[#EFE6D5] opacity-70 mb-10 max-w-2xl mx-auto">
                        Register now for Srinathon and other events. Form your clan,
                        prepare your arsenal, and claim your glory.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="btn-ronin btn-ronin-jade text-lg animate-pulse-jade"
                    >
                        ⚔️ Join the Fight
                    </button>
                </div>
            </section>

            {/* ========== FAQ SECTION - JADE GREEN ========== */}
            <section id="faq" className="block-jade py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-mega text-3xl sm:text-4xl text-[#EFE6D5] mb-10 text-center">
                        QUESTIONS & ANSWERS
                    </h2>
                    <div className="space-y-4">
                        <details className="card-ronin p-4 group">
                            <summary className="font-header text-[#EFE6D5] cursor-pointer flex justify-between items-center">
                                Who can participate?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-[#4A7A7A]" />
                            </summary>
                            <p className="font-body text-[#EFE6D5] opacity-70 mt-3 text-sm">
                                Any student or recent graduate can apply. We welcome developers,
                                designers, and product managers of all skill levels.
                            </p>
                        </details>
                        <details className="card-ronin p-4 group">
                            <summary className="font-header text-[#EFE6D5] cursor-pointer flex justify-between items-center">
                                Do I need a team?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-[#4A7A7A]" />
                            </summary>
                            <p className="font-body text-[#EFE6D5] opacity-70 mt-3 text-sm">
                                You can join solo and form a clan at the start of the event,
                                or come with a pre-formed team of up to 4 warriors.
                            </p>
                        </details>
                        <details className="card-ronin p-4 group">
                            <summary className="font-header text-[#EFE6D5] cursor-pointer flex justify-between items-center">
                                What about provisions?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-[#4A7A7A]" />
                            </summary>
                            <p className="font-body text-[#EFE6D5] opacity-70 mt-3 text-sm">
                                All meals are included! Pay the entry fee to get your meal
                                pass QR code for breakfast, lunch, and dinner.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
