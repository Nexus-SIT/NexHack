'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

const CTASection = () => {
    const router = useRouter();

    return (
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
    );
};

export default CTASection;
