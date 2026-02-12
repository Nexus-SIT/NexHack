'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';
import HeroSection from '@/components/landing/HeroSection';
import EventsSection from '@/components/landing/EventsSection';
import ScheduleSection from '@/components/landing/ScheduleSection';
import SpeakersSection from '@/components/landing/SpeakersSection';
import CTASection from '@/components/landing/CTASection';
import FAQSection from '@/components/landing/FAQSection';

export default function Landing() {
    const { user, logout } = useAuth();

    return (
        <Layout user={user} onLogout={logout}>
            <HeroSection />
            <div className="divider-zigzag bg-[#080808]"></div>

            <EventsSection />
            <div className="divider-zigzag-white bg-[#0E46A3]"></div>

            <ScheduleSection />
            <div className="divider-zigzag bg-[#080808]"></div>

            <SpeakersSection />
            <div className="divider-zigzag-white bg-[#0E46A3]"></div>

            <CTASection />
            <div className="divider-zigzag bg-[#080808]"></div>

            <FAQSection />
        </Layout>
    );
}
