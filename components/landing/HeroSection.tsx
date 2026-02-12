'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import KathakaliSVG from './KathakaliSVG';

const HeroSection = () => {
    const router = useRouter();

    return (
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
    );
};

export default HeroSection;
