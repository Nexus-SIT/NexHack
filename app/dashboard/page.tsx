'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { User, Team, Coupon, CouponStatus, Announcement, UserRole } from '@/types';
import { getStoredTeams, createTeam, joinTeam, getUserCoupons, getTeamById, getTeamMembers, getAnnouncements } from '@/services/mockDb';
import { Users, Plus, Coffee, AlertCircle, RefreshCw, Trophy, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

// Dynamic import for QRCode to avoid SSR issues
const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

export default function Dashboard() {
    const router = useRouter();
    const { user, logout, isLoading: authLoading } = useAuth();

    const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'food'>('overview');
    const [team, setTeam] = useState<Team | null>(null);
    const [members, setMembers] = useState<User[]>([]);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Forms
    const [teamName, setTeamName] = useState('');
    const [joinTeamId, setJoinTeamId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (!authLoading && user && user.role !== UserRole.PARTICIPANT) {
            router.push('/admin');
            return;
        }
    }, [user, authLoading, router]);

    const refreshData = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const [allCoupons, allAnnouncements] = await Promise.all([
                getUserCoupons(user.id),
                getAnnouncements()
            ]);
            setCoupons(allCoupons);
            setAnnouncements(allAnnouncements);

            if (user.teamId) {
                const myTeam = await getTeamById(user.teamId);
                if (myTeam) {
                    setTeam(myTeam);
                    const mems = await getTeamMembers(myTeam.members);
                    setMembers(mems);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === UserRole.PARTICIPANT) {
            refreshData();
        }
    }, [user]);

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            await createTeam(teamName, "Awesome project", user.id);
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            await joinTeam(joinTeamId, user.id);
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (authLoading || !user) {
        return (
            <Layout user={null} onLogout={() => { }}>
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (isLoading) {
        return (
            <Layout user={user} onLogout={logout}>
                <div className="flex justify-center items-center h-96">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout user={user} onLogout={logout}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Welcome back, {user.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Role: <span className="font-medium text-primary">{user.role}</span>
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                            {['overview', 'team', 'food'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Announcements */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-lg font-medium text-gray-900">Latest Updates</h3>
                            {announcements.map(a => (
                                <div key={a.id} className="bg-white shadow rounded-lg p-6 border-l-4 border-primary">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-semibold text-gray-900">{a.title}</h4>
                                        <span className="text-xs text-gray-400">{new Date(a.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="mt-2 text-gray-600">{a.message}</p>
                                    <div className="mt-4 flex items-center text-xs text-gray-500">
                                        <span className="font-medium mr-2">Posted by:</span> {a.author}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <Trophy className="w-5 h-5 mr-2" /> Hackathon Status
                                </h3>
                                <div className="text-3xl font-bold">12h 30m</div>
                                <p className="text-indigo-100 text-sm">Remaining until deadline</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-6">
                            {team ? (
                                <div>
                                    <div className="border-b border-gray-200 pb-6 mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">{team.name}</h3>
                                        <p className="mt-1 text-gray-500">{team.description}</p>
                                        <p className="mt-2 text-xs text-gray-400">Team ID: {team.id}</p>
                                    </div>

                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Team Members ({team.members.length}/4)</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {members.map(member => (
                                            <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{member.name}</div>
                                                    <div className="text-xs text-gray-500">{member.email}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {/* Create Team */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                            <Plus className="w-5 h-5 mr-2" /> Create a Team
                                        </h3>
                                        <form onSubmit={handleCreateTeam} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Team Name"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                                value={teamName}
                                                onChange={e => setTeamName(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                                Create Team
                                            </button>
                                        </form>
                                    </div>

                                    {/* Join Team */}
                                    <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-12">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                            <Users className="w-5 h-5 mr-2" /> Join Existing Team
                                        </h3>
                                        <form onSubmit={handleJoinTeam} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Team ID"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                                value={joinTeamId}
                                                onChange={e => setJoinTeamId(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="w-full bg-white text-primary border border-primary py-2 px-4 rounded-md hover:bg-indigo-50">
                                                Join Team
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mt-6 flex items-center text-red-600 bg-red-50 p-3 rounded-md">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'food' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Meal Coupons</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {coupons.map((coupon) => (
                                <div
                                    key={coupon.id}
                                    className={`relative overflow-hidden rounded-2xl border ${coupon.status === CouponStatus.REDEEMED
                                            ? 'bg-gray-100 border-gray-200 opacity-75 grayscale'
                                            : 'bg-white border-gray-200 shadow-lg'
                                        }`}
                                >
                                    <div className={`h-2 w-full ${coupon.type === 'BREAKFAST' ? 'bg-orange-400' :
                                            coupon.type === 'LUNCH' ? 'bg-green-500' : 'bg-indigo-500'
                                        }`} />
                                    <div className="p-6 text-center">
                                        <div className="mx-auto bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                            <Coffee className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">{coupon.type}</h4>
                                        <p className="text-sm text-gray-500 mb-6">
                                            {coupon.status === CouponStatus.REDEEMED ? 'Redeemed' : 'Valid for one meal'}
                                        </p>

                                        <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 inline-block">
                                            <QRCode value={coupon.id} size={140} level="H" />
                                        </div>

                                        <div className="mt-4 text-xs font-mono text-gray-400">
                                            ID: {coupon.id}
                                        </div>

                                        {coupon.status === CouponStatus.REDEEMED && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-[1px]">
                                                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold transform -rotate-12 shadow-lg">
                                                    USED
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
