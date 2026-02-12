'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();

    return (
        <section
            className="relative overflow-hidden min-h-[95vh] flex items-center"
            style={{
                backgroundImage: 'url(/herobg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 w-full">
                <div className="flex flex-col items-center text-center relative">

                    {/* NEXATHON text image — behind dancer */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-0 w-[90%] sm:w-[85%] md:w-[80%] pointer-events-none select-none">
                        <Image
                            src="/nexathontext.png"
                            alt="NEXATHON"
                            width={1920}
                            height={400}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Yakshagana dancer — centered, in front of title */}
                    <div className="relative z-10 w-[500px] sm:w-[600px] md:w-[720px] lg:w-[850px] xl:w-[900px] mb-6">
                        <Image
                            src="/yaksaganahero.png"
                            alt="Yakshagana Dancer"
                            width={1000}
                            height={1000}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Tagline */}
                    <p className="font-header text-sm sm:text-base text-white/70 tracking-[0.3em] mb-2 relative z-20">
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
