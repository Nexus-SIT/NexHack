'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Utensils, Award, ChevronRight, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

export default function Landing() {
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <Layout user={user} onLogout={logout}>
            <div className="animate-fade-in">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white pt-16 pb-32 space-y-24">
                    <div className="relative">
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                                <div className="mt-6">
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-medium text-sm mb-6">
                                        <span className="animate-pulse mr-2 w-2 h-2 rounded-full bg-primary"></span>
                                        Registration Open for 2024
                                    </div>
                                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                                        Build the future at <span className="text-primary">NexHackPortal</span>
                                    </h1>
                                    <p className="mt-4 text-lg text-gray-500">
                                        Join 500+ developers, designers, and innovators for a 48-hour sprint to solve global challenges. Prizes worth $50k up for grabs.
                                    </p>
                                    <div className="mt-8 flex gap-4">
                                        <button
                                            onClick={() => router.push('/login')}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 transition-all"
                                        >
                                            Register Now <ChevronRight className="ml-2 h-5 w-5" />
                                        </button>
                                        <a
                                            href="#about"
                                            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 sm:mt-16 lg:mt-0">
                                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                                    <img
                                        className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                        src="https://picsum.photos/800/600"
                                        alt="Hackathon Coding"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div id="about" className="py-16 bg-gray-50 overflow-hidden lg:py-24">
                    <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Why Join?</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to innovate
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: Users, title: 'Team Building', desc: 'Find teammates easily through our portal.' },
                                { icon: Utensils, title: 'Free Meals', desc: 'Breakfast, lunch, and dinner provided.' },
                                { icon: Calendar, title: 'Workshops', desc: 'Learn from industry experts.' },
                                { icon: Award, title: 'Big Prizes', desc: 'Cash prizes and startup grants.' },
                            ].map((feature, idx) => (
                                <div key={idx} className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-xl shadow-sm hover:shadow-md transition-all">
                                    <div>
                                        <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-primary ring-4 ring-white">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div id="schedule" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Event Schedule</h2>
                        <div className="space-y-8">
                            {[
                                { time: '09:00 AM', event: 'Check-in & Breakfast', type: 'Logistics' },
                                { time: '10:30 AM', event: 'Opening Ceremony', type: 'Keynote' },
                                { time: '12:00 PM', event: 'Hacking Begins', type: 'Milestone' },
                                { time: '01:00 PM', event: 'Lunch Served', type: 'Food' },
                                { time: '06:00 PM', event: 'Workshop: AI Integrations', type: 'Learning' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-12 border-l-2 border-primary/20 pl-8 relative hover:bg-gray-50 rounded-r-lg p-4 transition-colors">
                                    <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                                    <div className="min-w-[120px] flex items-center text-primary font-semibold">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {item.time}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-xl font-bold text-gray-900">{item.event}</h4>
                                        <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div id="faq" className="py-16 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="group p-6 bg-white rounded-lg shadow-sm open:ring-1 open:ring-primary/20">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span>Who can participate?</span>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronRight />
                                    </span>
                                </summary>
                                <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
                                    Any student or recent graduate can apply. We welcome developers, designers, and product managers of all skill levels.
                                </p>
                            </details>
                            <details className="group p-6 bg-white rounded-lg shadow-sm">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span>Do I need a team?</span>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronRight />
                                    </span>
                                </summary>
                                <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
                                    You can join solo and form a team at the start of the event, or come with a pre-formed team of up to 4 people.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
