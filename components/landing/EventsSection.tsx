import React from 'react';
import { Zap, Bot, Plane, Code, Cpu, Globe, Trophy, Lightbulb } from 'lucide-react';

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

const EventsSection = () => {
    return (
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
    );
};

export default EventsSection;
