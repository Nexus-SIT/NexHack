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
            color: 'bg-[#FF0000]'
        },
        {
            icon: Bot,
            title: 'Robo Race',
            desc: 'Build. Race. Conquer.',
            color: 'bg-[#FFD700]'
        },
        {
            icon: Plane,
            title: 'Aero Events',
            desc: 'Take Flight with Innovation',
            color: 'bg-[#00B4D8]'
        },
        {
            icon: Trophy,
            title: 'More Events',
            desc: 'Workshops, Talks & More!',
            color: 'bg-[#22C55E]'
        },
    ];

    const schedule = [
        { time: '09:00 AM', event: 'Check-in & Breakfast', type: '🎉 Start' },
        { time: '10:30 AM', event: 'Opening Ceremony', type: '🎤 Stage' },
        { time: '12:00 PM', event: 'Srinathon Begins!', type: '🔥 Hack' },
        { time: '01:00 PM', event: 'Lunch Served', type: '🍕 Food' },
        { time: '06:00 PM', event: 'Robo Race Qualifiers', type: '🤖 Race' },
    ];

    return (
        <Layout user={user} onLogout={logout}>
            {/* Hero Section - Blue Block */}
            <section className="block-blue py-16 sm:py-24 relative overflow-hidden">
                {/* Decorative dots pattern */}
                <div className="absolute inset-0 pattern-dots opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            {/* Sticker badge */}
                            <div className="sticker inline-block mb-6">
                                <span className="font-carnival text-sm">🎊 Festival Mode ON</span>
                            </div>

                            <h1 className="font-carnival text-4xl sm:text-5xl lg:text-7xl text-[#1A1A2E] leading-tight mb-6">
                                Welcome to
                                <span className="block text-[#FFD700] drop-shadow-[3px_3px_0_#1A1A2E]">
                                    Nexothsav
                                </span>
                            </h1>

                            <p className="font-body text-lg sm:text-xl text-[#1A1A2E] mb-4 max-w-lg">
                                We're conducting many exciting activities! Our flagship event <strong className="text-[#FF0000]">Srinathon</strong> is a 24-hour hackathon where innovation meets creativity.
                            </p>
                            <p className="font-body text-lg text-[#1A1A2E] mb-8 max-w-lg">
                                Other thrilling events include <strong>Robo Race</strong>, <strong>Aero Events</strong>, and many more!
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="btn-carnival btn-carnival-yellow"
                                >
                                    Join Now <ChevronRight className="w-5 h-5" />
                                </button>
                                <a
                                    href="#events"
                                    className="btn-carnival btn-carnival-white"
                                >
                                    Explore Events
                                </a>
                            </div>
                        </div>

                        {/* Hero Illustration */}
                        <div className="relative hidden lg:block">
                            <div className="card-carnival-yellow p-8 transform rotate-2">
                                <div className="text-center">
                                    <div className="font-carnival text-6xl mb-4">🎪</div>
                                    <h3 className="font-carnival text-2xl text-[#1A1A2E] mb-2">24 Hours</h3>
                                    <p className="font-body text-[#1A1A2E]">of Non-Stop Innovation</p>
                                    <div className="mt-4 flex justify-center gap-4">
                                        <span className="text-4xl">🔥</span>
                                        <span className="text-4xl">🚀</span>
                                        <span className="text-4xl">💡</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Wave Divider */}
            <div className="divider-wave bg-[#FFD700]"></div>

            {/* Events Section - Yellow Block */}
            <section id="events" className="block-yellow py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-carnival text-3xl sm:text-4xl text-[#1A1A2E] mb-4">
                            🎭 Our Events
                        </h2>
                        <p className="font-body text-lg text-[#1A1A2E]">
                            Something for everyone at Nexothsav!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event, idx) => (
                            <div
                                key={idx}
                                className={`card-carnival p-6 ${event.highlight ? 'ring-4 ring-[#FF0000] transform -rotate-1' : ''}`}
                            >
                                <div className={`w-14 h-14 ${event.color} border-3 border-[#1A1A2E] flex items-center justify-center mb-4`}>
                                    <event.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-carnival text-xl text-[#1A1A2E] mb-2">
                                    {event.title}
                                </h3>
                                <p className="font-body text-[#1A1A2E] text-sm">
                                    {event.desc}
                                </p>
                                {event.highlight && (
                                    <span className="badge-carnival badge-carnival-red mt-4 inline-block">
                                        Flagship
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zigzag Divider */}
            <div className="divider-zigzag bg-[#1A1A2E]"></div>

            {/* Schedule Section - Navy Block */}
            <section id="schedule" className="block-navy py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-carnival text-3xl sm:text-4xl text-[#FFD700] mb-4">
                            📅 Event Schedule
                        </h2>
                        <p className="font-body text-lg text-gray-300">
                            Don't miss a moment of Nexothsav!
                        </p>
                    </div>

                    <div className="space-y-4">
                        {schedule.map((item, idx) => (
                            <div
                                key={idx}
                                className="card-carnival p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                                <div className="flex items-center gap-3 sm:min-w-[140px]">
                                    <Clock className="w-5 h-5 text-[#FF0000]" />
                                    <span className="font-carnival text-[#FF0000]">{item.time}</span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-carnival text-lg text-[#1A1A2E]">{item.event}</h4>
                                </div>
                                <span className="badge-carnival badge-carnival-yellow self-start sm:self-auto">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wave Divider (inverted) */}
            <div className="divider-wave-yellow bg-[#00B4D8]"></div>

            {/* CTA Section - Blue Block */}
            <section className="block-blue py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-carnival text-3xl sm:text-4xl text-[#1A1A2E] mb-6">
                        Ready to Join the Party? 🎉
                    </h2>
                    <p className="font-body text-xl text-[#1A1A2E] mb-8 max-w-2xl mx-auto">
                        Register now for Srinathon and other events. Form your team, pay the entry fee, and get your meal passes ready!
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="btn-carnival btn-carnival-red text-lg"
                    >
                        🚀 Register Now
                    </button>
                </div>
            </section>

            {/* FAQ Section - Yellow Block */}
            <section id="faq" className="block-yellow py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-carnival text-3xl text-[#1A1A2E] mb-8 text-center">
                        ❓ FAQs
                    </h2>
                    <div className="space-y-4">
                        <details className="card-carnival p-4 group">
                            <summary className="font-carnival text-[#1A1A2E] cursor-pointer flex justify-between items-center">
                                Who can participate?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                            </summary>
                            <p className="font-body text-[#1A1A2E] mt-3">
                                Any student or recent graduate can apply. We welcome developers, designers, and product managers of all skill levels.
                            </p>
                        </details>
                        <details className="card-carnival p-4 group">
                            <summary className="font-carnival text-[#1A1A2E] cursor-pointer flex justify-between items-center">
                                Do I need a team?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                            </summary>
                            <p className="font-body text-[#1A1A2E] mt-3">
                                You can join solo and form a team at the start of the event, or come with a pre-formed team of up to 4 people.
                            </p>
                        </details>
                        <details className="card-carnival p-4 group">
                            <summary className="font-carnival text-[#1A1A2E] cursor-pointer flex justify-between items-center">
                                What about food?
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                            </summary>
                            <p className="font-body text-[#1A1A2E] mt-3">
                                All meals are included! Pay the entry fee to get your meal pass QR code for breakfast, lunch, and dinner.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
