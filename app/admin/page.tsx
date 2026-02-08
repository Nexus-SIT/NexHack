'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';
import { getAllStats } from '@/services/database';
import { ScanLine, Users, Trophy, Utensils, Loader2, ArrowRight, RefreshCw, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

interface Stats {
    totalUsers: number;
    totalParticipants: number;
    paidParticipants: number;
    totalTeams: number;
    mealsConsumed: { breakfast: number; lunch: number; dinner: number };
    totalMealsServed: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout, isLoading: authLoading } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (!authLoading && user && user.role === UserRole.PARTICIPANT) {
            router.push('/dashboard');
            return;
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user && (user.role === UserRole.ADMIN || user.role === UserRole.ORGANIZER)) {
            loadStats();
        }
    }, [user]);

    const loadStats = async () => {
        setIsLoading(true);
        const data = await getAllStats();
        setStats(data);
        setIsLoading(false);
    };

    if (authLoading || !user) {
        return (
            <Layout user={null} onLogout={() => { }}>
                <div className="block-blue flex justify-center items-center h-96">
                    <Loader2 className="w-10 h-10 animate-spin text-[#FFD700]" />
                </div>
            </Layout>
        );
    }

    if (isLoading) {
        return (
            <Layout user={user} onLogout={logout}>
                <div className="block-blue flex justify-center items-center h-96">
                    <RefreshCw className="w-10 h-10 animate-spin text-[#FFD700]" />
                </div>
            </Layout>
        );
    }

    const paymentPercent = stats && stats.totalParticipants > 0
        ? Math.round((stats.paidParticipants / stats.totalParticipants) * 100)
        : 0;

    return (
        <Layout user={user} onLogout={logout}>
            {/* Header */}
            <section className="block-navy py-8 border-b-4 border-[#FFD700]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="font-carnival text-2xl sm:text-3xl text-[#FFD700]">
                                🛡️ Admin Dashboard
                            </h1>
                            <p className="font-body text-gray-300 mt-1">Manage Srinathon & Nexothsav</p>
                        </div>

                        <button
                            onClick={() => router.push('/admin/scanner')}
                            className="btn-carnival btn-carnival-red"
                        >
                            <ScanLine className="w-5 h-5" />
                            Food Scanner
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="block-yellow py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="card-carnival p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#00B4D8] border-3 border-[#1A1A2E] flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-body text-xs text-[#1A1A2E] opacity-60">Participants</p>
                                    <p className="font-carnival text-2xl text-[#1A1A2E]">{stats?.totalParticipants || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-carnival p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#22C55E] border-3 border-[#1A1A2E] flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-body text-xs text-[#1A1A2E] opacity-60">Teams</p>
                                    <p className="font-carnival text-2xl text-[#1A1A2E]">{stats?.totalTeams || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-carnival p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#FF0000] border-3 border-[#1A1A2E] flex items-center justify-center">
                                    <Utensils className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-body text-xs text-[#1A1A2E] opacity-60">Meals Served</p>
                                    <p className="font-carnival text-2xl text-[#1A1A2E]">{stats?.totalMealsServed || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-carnival p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#FFD700] border-3 border-[#1A1A2E] flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-[#1A1A2E]" />
                                </div>
                                <div>
                                    <p className="font-body text-xs text-[#1A1A2E] opacity-60">Paid Users</p>
                                    <p className="font-carnival text-2xl text-[#1A1A2E]">{stats?.paidParticipants || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meal & Payment Status */}
            <section className="block-blue py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Meal Distribution */}
                        <div className="card-carnival p-6">
                            <h3 className="font-carnival text-lg text-[#1A1A2E] mb-6">🍕 Meal Distribution</h3>
                            <div className="space-y-4">
                                {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => {
                                    const served = stats?.mealsConsumed[meal] || 0;
                                    const total = stats?.paidParticipants || 1;
                                    const percent = Math.round((served / total) * 100);
                                    const emojis = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };

                                    return (
                                        <div key={meal} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="font-carnival text-[#1A1A2E] capitalize">
                                                    {emojis[meal]} {meal}
                                                </span>
                                                <span className="font-body text-[#1A1A2E]">
                                                    {served} / {total}
                                                </span>
                                            </div>
                                            <div className="h-4 bg-gray-200 border-2 border-[#1A1A2E]">
                                                <div
                                                    className="h-full bg-[#FF0000]"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="card-carnival p-6">
                            <h3 className="font-carnival text-lg text-[#1A1A2E] mb-6">💰 Payment Status</h3>
                            <div className="flex items-center justify-center gap-8">
                                <div className="text-center">
                                    <div className="w-32 h-32 border-8 border-[#1A1A2E] rounded-full flex items-center justify-center bg-[#FFD700]">
                                        <span className="font-carnival text-3xl text-[#1A1A2E]">{paymentPercent}%</span>
                                    </div>
                                    <p className="font-body text-[#1A1A2E] mt-2">Paid</p>
                                </div>
                                <div className="space-y-2 text-left">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-[#FFD700] border-2 border-[#1A1A2E]"></div>
                                        <span className="font-body text-[#1A1A2E]">
                                            Paid: {stats?.paidParticipants || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-300 border-2 border-[#1A1A2E]"></div>
                                        <span className="font-body text-[#1A1A2E]">
                                            Pending: {(stats?.totalParticipants || 0) - (stats?.paidParticipants || 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="block-navy py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="font-carnival text-xl text-[#FFD700] mb-6">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => router.push('/admin/scanner')}
                            className="card-carnival-yellow p-6 text-left hover:transform hover:scale-[1.02] transition-transform"
                        >
                            <ScanLine className="w-8 h-8 text-[#FF0000] mb-2" />
                            <h4 className="font-carnival text-lg text-[#1A1A2E]">Scan Meals</h4>
                            <p className="font-body text-sm text-[#1A1A2E] opacity-60">Open food scanner</p>
                        </button>

                        <button
                            onClick={loadStats}
                            className="card-carnival p-6 text-left hover:transform hover:scale-[1.02] transition-transform"
                        >
                            <RefreshCw className="w-8 h-8 text-[#00B4D8] mb-2" />
                            <h4 className="font-carnival text-lg text-[#1A1A2E]">Refresh Stats</h4>
                            <p className="font-body text-sm text-[#1A1A2E] opacity-60">Update dashboard data</p>
                        </button>

                        <button
                            onClick={() => router.push('/')}
                            className="card-carnival p-6 text-left hover:transform hover:scale-[1.02] transition-transform"
                        >
                            <Trophy className="w-8 h-8 text-[#22C55E] mb-2" />
                            <h4 className="font-carnival text-lg text-[#1A1A2E]">View Site</h4>
                            <p className="font-body text-sm text-[#1A1A2E] opacity-60">Go to homepage</p>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
