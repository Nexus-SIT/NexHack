'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, Clock, Zap, Bot, Plane, Trophy,
    Code, Cpu, Globe, Lightbulb, Users, Mic, HelpCircle
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

/* ====================================================================
   INLINE SVG — KATHAKALI DANCER
   Woodcut / linocut-style, high-contrast black & white vector.
   Positioned as the centrepiece of the hero section.
   ==================================================================== */
const KathakaliSVG = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 400 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Crown / Kireedam */}
        <path
            d="M200 20 L160 80 L140 60 L120 90 L100 70 L90 100 L70 95 L80 130 L60 140 L85 160 L200 140 L315 160 L340 140 L320 130 L330 95 L310 100 L300 70 L280 90 L260 60 L240 80 L200 20Z"
            fill="#080808"
            stroke="white"
            strokeWidth="3"
        />
        {/* Crown details — radiating lines */}
        <line x1="200" y1="30" x2="200" y2="80" stroke="white" strokeWidth="2" />
        <line x1="170" y1="50" x2="165" y2="85" stroke="white" strokeWidth="1.5" />
        <line x1="230" y1="50" x2="235" y2="85" stroke="white" strokeWidth="1.5" />
        <line x1="140" y1="65" x2="130" y2="95" stroke="white" strokeWidth="1.5" />
        <line x1="260" y1="65" x2="270" y2="95" stroke="white" strokeWidth="1.5" />
        {/* Crown ornamental circles */}
        <circle cx="200" cy="45" r="8" fill="white" />
        <circle cx="200" cy="45" r="4" fill="#080808" />
        <circle cx="160" cy="70" r="5" fill="white" />
        <circle cx="240" cy="70" r="5" fill="white" />
        <circle cx="130" cy="82" r="4" fill="white" />
        <circle cx="270" cy="82" r="4" fill="white" />

        {/* Face — oval */}
        <ellipse cx="200" cy="210" rx="75" ry="90" fill="white" stroke="#080808" strokeWidth="4" />
        {/* Face contour lines (woodcut cross-hatching) */}
        <path d="M145 180 Q155 175 165 180" stroke="#080808" strokeWidth="1.5" fill="none" />
        <path d="M235 180 Q245 175 255 180" stroke="#080808" strokeWidth="1.5" fill="none" />

        {/* Eyes — dramatic Kathakali style */}
        <ellipse cx="170" cy="200" rx="22" ry="12" fill="#080808" />
        <ellipse cx="170" cy="200" rx="14" ry="8" fill="white" />
        <circle cx="170" cy="200" r="5" fill="#080808" />
        <ellipse cx="230" cy="200" rx="22" ry="12" fill="#080808" />
        <ellipse cx="230" cy="200" rx="14" ry="8" fill="white" />
        <circle cx="230" cy="200" r="5" fill="#080808" />
        {/* Eye extensions — traditional makeup lines */}
        <path d="M145 195 L130 185" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M255 195 L270 185" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M145 205 L128 215" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M255 205 L272 215" stroke="#080808" strokeWidth="3" strokeLinecap="round" />

        {/* Dramatic eyebrows */}
        <path d="M148 182 Q170 165 192 182" stroke="#080808" strokeWidth="4" fill="none" />
        <path d="M208 182 Q230 165 252 182" stroke="#080808" strokeWidth="4" fill="none" />

        {/* Nose */}
        <path d="M200 210 L195 240 L200 245 L205 240 L200 210" fill="#080808" />

        {/* Mouth — curved, stylized */}
        <path d="M175 260 Q188 275 200 270 Q212 275 225 260" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M180 262 Q200 280 220 262" stroke="#080808" strokeWidth="1.5" fill="none" />

        {/* Cheek patterns — traditional chutti */}
        <path d="M140 230 Q135 250 145 270" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M135 235 Q128 255 140 275" stroke="#080808" strokeWidth="2" fill="none" />
        <path d="M260 230 Q265 250 255 270" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M265 235 Q272 255 260 275" stroke="#080808" strokeWidth="2" fill="none" />

        {/* Chin ornament / Chutti beard */}
        <path
            d="M160 290 Q170 310 200 320 Q230 310 240 290"
            fill="#080808"
            stroke="white"
            strokeWidth="2"
        />
        <path d="M170 295 Q200 315 230 295" stroke="white" strokeWidth="1.5" fill="none" />

        {/* Ear ornaments */}
        <ellipse cx="115" cy="220" rx="15" ry="25" fill="#080808" stroke="white" strokeWidth="2" />
        <ellipse cx="115" cy="220" rx="8" ry="15" fill="white" />
        <ellipse cx="285" cy="220" rx="15" ry="25" fill="#080808" stroke="white" strokeWidth="2" />
        <ellipse cx="285" cy="220" rx="8" ry="15" fill="white" />

        {/* Neck / collar ornament */}
        <rect x="160" y="300" width="80" height="20" fill="#080808" stroke="white" strokeWidth="2" />
        <line x1="175" y1="300" x2="175" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="190" y1="300" x2="190" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="210" y1="300" x2="210" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="225" y1="300" x2="225" y2="320" stroke="white" strokeWidth="1.5" />

        {/* Shoulders / upper body — woodcut style */}
        <path
            d="M160 320 L100 380 L80 500 L150 500 L160 420 L200 440 L240 420 L250 500 L320 500 L300 380 L240 320Z"
            fill="#080808"
            stroke="white"
            strokeWidth="3"
        />
        {/* Body cross-hatching details */}
        <line x1="120" y1="400" x2="150" y2="480" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="130" y1="390" x2="155" y2="470" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="280" y1="400" x2="250" y2="480" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="270" y1="390" x2="245" y2="470" stroke="white" strokeWidth="1" opacity="0.5" />

        {/* Chest ornament — necklace */}
        <path d="M160 340 Q180 370 200 360 Q220 370 240 340" stroke="white" strokeWidth="2.5" fill="none" />
        <circle cx="200" cy="365" r="8" fill="white" />
        <circle cx="200" cy="365" r="4" fill="#080808" />
        <circle cx="178" cy="358" r="5" fill="white" />
        <circle cx="222" cy="358" r="5" fill="white" />

        {/* Mudra hands — right hand raised */}
        <path
            d="M310 370 L340 340 L350 345 L335 365 L355 350 L360 358 L340 375 L360 365 L362 374 L335 385 L310 390Z"
            fill="white"
            stroke="#080808"
            strokeWidth="2.5"
        />

        {/* Mudra hands — left hand extended */}
        <path
            d="M90 370 L60 340 L50 345 L65 365 L45 350 L40 358 L60 375 L40 365 L38 374 L65 385 L90 390Z"
            fill="white"
            stroke="#080808"
            strokeWidth="2.5"
        />
    </svg>
);

export default function Landing() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const events = [
        {
            icon: Zap,
            title: 'Hackathon',
            desc: '24-Hour Flagship Coding Marathon',
            highlight: true,
            span: 'bento-span-2',
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
            icon: Code,
            title: 'Code Sprint',
            desc: 'Competitive programming challenges',
            span: 'bento-span-2 bento-span-row-2',
        },
        {
            icon: Cpu,
            title: 'AI/ML Track',
            desc: 'Machine learning & deep learning builds',
        },
        {
            icon: Globe,
            title: 'Web3 Track',
            desc: 'Blockchain & decentralized apps',
        },
        {
            icon: Trophy,
            title: 'More Events',
            desc: 'Workshops, Talks & More!',
        },
        {
            icon: Lightbulb,
            title: 'Ideathon',
            desc: 'Present your big idea to the world',
        },
    ];

    const schedule = [
        { time: '09:00 AM', event: 'Check-in & Breakfast', type: 'START' },
        { time: '10:30 AM', event: 'Opening Ceremony', type: 'STAGE' },
        { time: '12:00 PM', event: 'Hacking Begins!', type: 'HACK' },
        { time: '01:00 PM', event: 'Lunch Served', type: 'FOOD' },
        { time: '06:00 PM', event: 'Workshop: AI in Production', type: 'LEARN' },
        { time: '09:00 PM', event: 'Dinner & Networking', type: 'FOOD' },
        { time: '12:00 AM', event: 'Midnight Snacks & Gaming', type: 'FUN' },
        { time: '10:00 AM', event: 'Final Submissions', type: 'HACK' },
    ];

    const speakers = [
        { name: 'Dr. Ananya Rao', role: 'AI Researcher, IISc', initial: 'AR' },
        { name: 'Karthik Menon', role: 'CTO, TechNova', initial: 'KM' },
        { name: 'Priya Sharma', role: 'Lead SDE, Google', initial: 'PS' },
        { name: 'Ravi Kumar', role: 'Founder, BuildStack', initial: 'RK' },
    ];

    return (
        <Layout user={user} onLogout={logout}>
            {/* ========================================================================
                HERO SECTION — Royal Blue + Kathakali Dancer + NEXATHON Title
                ======================================================================== */}
            <section className="block-blue relative overflow-hidden min-h-[95vh] flex items-center">
                {/* Watermark pattern overlay */}
                <div className="absolute inset-0 pattern-mandala"></div>
                <div className="absolute inset-0 pattern-watermark"></div>

                {/* Subtle geometric frame lines */}
                <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/[0.06] pointer-events-none"></div>
                <div className="absolute top-10 left-10 right-10 bottom-10 border border-white/[0.04] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 w-full">
                    <div className="flex flex-col items-center text-center relative">

                        {/* NEXATHON title — behind dancer */}
                        <h1
                            className="font-mega text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] xl:text-[16rem] text-white leading-[0.85] tracking-wider select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.12]"
                            style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}
                        >
                            NEXATHON
                        </h1>

                        {/* Kathakali dancer — centered, in front of title */}
                        <div className="relative z-10 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] mb-6">
                            <KathakaliSVG className="w-full h-auto hero-illustration drop-shadow-[6px_6px_0px_rgba(0,0,0,0.5)]" />
                        </div>

                        {/* Foreground NEXATHON title */}
                        <h2 className="font-mega text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white relative z-20 mb-4"
                            style={{ textShadow: '4px 4px 0px #080808' }}
                        >
                            NEXATHON
                        </h2>

                        {/* Tagline */}
                        <p className="font-header text-sm sm:text-base text-white/70 tracking-[0.3em] mb-2">
                            CODE · CULTURE · CREATE
                        </p>

                        {/* Description block */}
                        <div className="card-nex p-5 sm:p-6 max-w-xl mb-8 relative z-20">
                            <p className="font-body text-white/80 text-sm leading-relaxed text-center">
                                A 24-hour hackathon where innovation meets tradition.
                                Build cutting-edge tech projects, compete across tracks,
                                and experience a culturally rooted, hyper-modern event.
                            </p>
                            <div className="mt-3 flex items-center justify-center gap-4 font-body text-xs text-white/40">
                                <span>24 HOURS</span>
                                <span className="text-white/20">■</span>
                                <span>MULTIPLE TRACKS</span>
                                <span className="text-white/20">■</span>
                                <span>₹2L+ PRIZES</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center relative z-20">
                            <button
                                onClick={() => router.push('/login')}
                                className="btn-nex btn-nex-primary animate-pulse-white"
                            >
                                Register Now <ChevronRight className="w-5 h-5" />
                            </button>
                            <a href="#events" className="btn-nex btn-nex-ghost">
                                Explore Events
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zigzag divider */}
            <div className="divider-zigzag bg-[#080808]"></div>

            {/* ========================================================================
                EVENTS — BENTO GRID
                ======================================================================== */}
            <section id="events" className="block-ink py-20 sm:py-28 relative">
                <div className="absolute inset-0 pattern-kolam"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="mb-12">
                        <span className="font-header text-xs text-[#1A5FCF] tracking-[0.3em]">// EVENTS &amp; TRACKS</span>
                        <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                            WHAT AWAITS YOU
                        </h2>
                    </div>

                    {/* Bento Grid */}
                    <div className="bento-grid">
                        {events.map((event, idx) => (
                            <div
                                key={idx}
                                className={`card-nex p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 ${event.span || ''
                                    } ${event.highlight ? 'ring-2 ring-white' : ''}`}
                            >
                                <div>
                                    <div className="w-12 h-12 bg-[#0E46A3] border-2 border-white flex items-center justify-center mb-4">
                                        <event.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-header text-lg text-white mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="font-body text-white/60 text-sm">
                                        {event.desc}
                                    </p>
                                </div>
                                {event.highlight && (
                                    <span className="badge-nex-white mt-4 inline-block self-start">
                                        Flagship
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zigzag divider */}
            <div className="divider-zigzag-white bg-[#0E46A3]"></div>

            {/* ========================================================================
                SCHEDULE TIMELINE
                ======================================================================== */}
            <section id="schedule" className="block-blue py-20 sm:py-28 relative">
                <div className="absolute inset-0 pattern-mandala"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-12">
                        <span className="font-header text-xs text-white/50 tracking-[0.3em]">// TIMELINE</span>
                        <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                            EVENT SCHEDULE
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {schedule.map((item, idx) => (
                            <div
                                key={idx}
                                className="card-nex-outline p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-white/[0.04] transition-all hover:translate-x-2"
                            >
                                <div className="flex items-center gap-3 sm:min-w-[140px]">
                                    <Clock className="w-4 h-4 text-white/40" />
                                    <span className="font-header text-sm text-white/60">{item.time}</span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-header text-sm text-white">{item.event}</h4>
                                </div>
                                <span className="badge-nex-outline self-start sm:self-auto text-[0.6rem]">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="divider-zigzag bg-[#080808]"></div>

            {/* ========================================================================
                SPEAKERS / JUDGES
                ======================================================================== */}
            <section id="tracks" className="block-ink py-20 sm:py-28 relative">
                <div className="absolute inset-0 pattern-kolam"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-12">
                        <span className="font-header text-xs text-[#1A5FCF] tracking-[0.3em]">// SPEAKERS &amp; JUDGES</span>
                        <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                            THE JURY
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {speakers.map((speaker, idx) => (
                            <div
                                key={idx}
                                className="card-nex p-6 text-center transition-transform hover:-translate-y-1"
                            >
                                {/* Avatar placeholder */}
                                <div className="w-20 h-20 mx-auto mb-4 bg-[#0E46A3] border-3 border-white flex items-center justify-center">
                                    <span className="font-mega text-2xl text-white">{speaker.initial}</span>
                                </div>
                                <h3 className="font-header text-sm text-white mb-1">
                                    {speaker.name}
                                </h3>
                                <p className="font-body text-white/50 text-xs">
                                    {speaker.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="divider-zigzag-white bg-[#0E46A3]"></div>

            {/* ========================================================================
                CTA — READY TO BUILD?
                ======================================================================== */}
            <section className="block-blue py-20 sm:py-28 relative">
                <div className="absolute inset-0 pattern-watermark"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="font-mega text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
                        style={{ textShadow: '3px 3px 0px #080808' }}
                    >
                        READY TO BUILD?
                    </h2>
                    <p className="font-body text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                        Register now for NEXATHON. Form your team, pick your track,
                        and build something extraordinary in 24 hours.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => router.push('/login')}
                            className="btn-nex btn-nex-primary text-lg animate-pulse-white"
                        >
                            🚀 Register Now
                        </button>
                        <button className="btn-nex btn-nex-ghost text-lg">
                            <Users className="w-5 h-5" />
                            Find a Team
                        </button>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="divider-zigzag bg-[#080808]"></div>

            {/* ========================================================================
                FAQ
                ======================================================================== */}
            <section id="faq" className="block-ink py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="font-header text-xs text-[#1A5FCF] tracking-[0.3em]">// GOT QUESTIONS?</span>
                        <h2 className="font-mega text-3xl sm:text-4xl lg:text-5xl text-white mt-2">
                            FAQ
                        </h2>
                    </div>
                    <div className="space-y-3">
                        <details className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                Who can participate?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                Any student or recent graduate can apply. We welcome developers,
                                designers, and product managers of all skill levels.
                            </p>
                        </details>
                        <details className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                Do I need a team?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                You can join solo and form a team at the event,
                                or come with a pre-formed team of up to 4 members.
                            </p>
                        </details>
                        <details className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                What about food?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                All meals are included! Pay the entry fee to get your meal
                                pass QR code for breakfast, lunch, dinner, and midnight snacks.
                            </p>
                        </details>
                        <details className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                What tracks are available?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                We have AI/ML, Web3, IoT, FinTech, and Open Innovation tracks.
                                Choose the one that matches your passion.
                            </p>
                        </details>
                        <details className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                What should I bring?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                Bring your laptop, charger, and your best ideas. We provide
                                the venue, Wi-Fi, power outlets, and all the energy you need.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
