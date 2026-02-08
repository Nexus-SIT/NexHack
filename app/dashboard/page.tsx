'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    User, Team, Announcement, UserRole, PaymentStatus, MealType
} from '@/types';
import {
    createTeam, joinTeamByCode, getTeamById, getTeamMembers,
    getAnnouncements, processPayment, submitProject, getCurrentUser
} from '@/services/database';
import { useAuth } from '@/components/AuthProvider';
import Layout from '@/components/Layout';
import {
    Users, Plus, AlertCircle, RefreshCw, Trophy, Loader2,
    CreditCard, Check, Copy, Send, Github, ExternalLink,
    Utensils, Crown, Coffee, Sun, Moon
} from 'lucide-react';
import { ENTRY_FEE_AMOUNT } from '@/types';

const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

export default function Dashboard() {
    const router = useRouter();
    const { user, logout, isLoading: authLoading, refreshUser, setUser } = useAuth();

    const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'food' | 'payment'>('overview');
    const [team, setTeam] = useState<Team | null>(null);
    const [members, setMembers] = useState<User[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [githubUrl, setGithubUrl] = useState('');
    const [presentationUrl, setPresentationUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

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
            const allAnnouncements = await getAnnouncements();
            setAnnouncements(allAnnouncements);

            if (user.teamId) {
                const myTeam = await getTeamById(user.teamId);
                if (myTeam) {
                    setTeam(myTeam);
                    const mems = await getTeamMembers(myTeam.members);
                    setMembers(mems);
                    if (myTeam.submission) {
                        setGithubUrl(myTeam.submission.githubUrl);
                        setPresentationUrl(myTeam.submission.presentationUrl);
                    }
                }
            }

            const freshUser = await getCurrentUser(user.id);
            if (freshUser) setUser(freshUser);
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
    }, [user?.id]);

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setError(''); setSuccess('');
        try {
            const newTeam = await createTeam(teamName, teamDescription || 'Ready to hack!', user.id);
            setSuccess(`🎉 Team created! Code: ${newTeam.inviteCode}`);
            await refreshData();
            await refreshUser();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setError(''); setSuccess('');
        try {
            await joinTeamByCode(inviteCode, user.id);
            setSuccess('🎊 Successfully joined the team!');
            await refreshData();
            await refreshUser();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !team) return;
        setError(''); setSuccess('');
        setIsSubmitting(true);
        try {
            await submitProject(team.id, user.id, githubUrl, presentationUrl);
            setSuccess('🚀 Project submitted!');
            await refreshData();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePayment = async () => {
        if (!user) return;
        setIsPaymentProcessing(true);
        setError('');
        try {
            const result = await processPayment(user.id);
            if (result.success) {
                setSuccess('💰 ' + result.message);
                await refreshUser();
                await refreshData();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsPaymentProcessing(false);
        }
    };

    const copyInviteCode = () => {
        if (team) {
            navigator.clipboard.writeText(team.inviteCode);
            setSuccess('📋 Copied!');
            setTimeout(() => setSuccess(''), 2000);
        }
    };

    const isTeamLeader = team && user && team.leaderId === user.id;

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

    return (
        <Layout user={user} onLogout={logout}>
            {/* Header Section */}
            <section className="block-yellow py-8 border-b-4 border-[#1A1A2E]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="font-carnival text-2xl sm:text-3xl text-[#1A1A2E]">
                                Welcome, {user.name}! 🎉
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className={`badge-carnival ${user.paymentStatus === PaymentStatus.PAID
                                        ? 'badge-carnival-navy'
                                        : 'badge-carnival-red'
                                    }`}>
                                    {user.paymentStatus === PaymentStatus.PAID ? '✓ PAID' : '⚠ PENDING'}
                                </span>
                                {team && (
                                    <span className="badge-carnival badge-carnival-navy">
                                        {team.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {(['overview', 'team', 'food', 'payment'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`btn-carnival text-xs py-2 px-4 ${activeTab === tab ? 'btn-carnival-red' : 'btn-carnival-white'
                                        }`}
                                >
                                    {tab === 'overview' && '🏠 '}
                                    {tab === 'team' && '👥 '}
                                    {tab === 'food' && '🍕 '}
                                    {tab === 'payment' && '💳 '}
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="block-blue py-8 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Alerts */}
                    {error && (
                        <div className="mb-6 card-carnival bg-[#FF0000] text-white p-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                            <button onClick={() => setError('')} className="ml-auto font-bold">×</button>
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 card-carnival-yellow p-4 flex items-center gap-2 text-[#1A1A2E]">
                            <Check className="w-5 h-5" />
                            {success}
                            <button onClick={() => setSuccess('')} className="ml-auto font-bold">×</button>
                        </div>
                    )}

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="font-carnival text-xl text-[#1A1A2E]">📣 Announcements</h3>
                                {announcements.length > 0 ? announcements.map(a => (
                                    <div key={a.id} className="card-carnival p-6">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-carnival text-lg text-[#1A1A2E]">{a.title}</h4>
                                            <span className="badge-carnival badge-carnival-yellow text-xs">
                                                {new Date(a.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className="font-body text-[#1A1A2E] mt-2">{a.message}</p>
                                    </div>
                                )) : (
                                    <div className="card-carnival p-6 text-center">
                                        <p className="font-body text-[#1A1A2E]">No announcements yet. Stay tuned! 🎊</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="card-carnival-yellow p-6 transform -rotate-1">
                                    <h3 className="font-carnival text-lg text-[#1A1A2E] mb-2">🔥 Srinathon</h3>
                                    <p className="font-carnival text-3xl text-[#FF0000]">24 HRS</p>
                                    <p className="font-body text-[#1A1A2E]">of Non-Stop Hacking!</p>
                                </div>

                                {user.paymentStatus !== PaymentStatus.PAID && (
                                    <div className="card-carnival bg-[#FF0000] p-4 text-white">
                                        <p className="font-body text-sm">⚠️ Pay entry fee to access meals & QR</p>
                                        <button
                                            onClick={() => setActiveTab('payment')}
                                            className="btn-carnival btn-carnival-yellow mt-3 w-full text-sm"
                                        >
                                            Pay Now →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Team Tab */}
                    {activeTab === 'team' && (
                        <div className="card-carnival p-6 sm:p-8">
                            {team ? (
                                <div className="space-y-8">
                                    {/* Team Info */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b-4 border-[#1A1A2E] pb-6">
                                        <div>
                                            <h3 className="font-carnival text-2xl text-[#1A1A2E] flex items-center gap-2">
                                                {team.name}
                                                {isTeamLeader && (
                                                    <span className="badge-carnival badge-carnival-red">
                                                        <Crown className="w-3 h-3 mr-1" /> LEADER
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="font-body text-[#1A1A2E] mt-1">{team.description}</p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <p className="font-carnival text-xs text-[#1A1A2E]">INVITE CODE</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="bg-[#FFD700] px-4 py-2 font-mono text-xl font-bold text-[#1A1A2E] border-3 border-[#1A1A2E]">
                                                    {team.inviteCode}
                                                </code>
                                                <button onClick={copyInviteCode} className="btn-carnival btn-carnival-navy p-2">
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div>
                                        <h4 className="font-carnival text-lg text-[#1A1A2E] mb-4">
                                            👥 Team ({team.members.length}/4)
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {members.map(member => (
                                                <div
                                                    key={member.id}
                                                    className={`p-4 border-3 border-[#1A1A2E] ${member.id === team.leaderId ? 'bg-[#FFD700]' : 'bg-white'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#FF0000] border-2 border-[#1A1A2E] flex items-center justify-center text-white font-carnival">
                                                            {member.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-carnival text-sm text-[#1A1A2E]">{member.name}</p>
                                                            <p className="font-body text-xs text-[#1A1A2E] opacity-60">{member.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submission */}
                                    {isTeamLeader && (
                                        <div className="border-t-4 border-[#1A1A2E] pt-6">
                                            <h4 className="font-carnival text-lg text-[#1A1A2E] mb-4">🚀 Submit Project</h4>
                                            {team.submission ? (
                                                <div className="bg-[#22C55E] text-white p-4 border-3 border-[#1A1A2E]">
                                                    <p className="font-carnival">✓ SUBMITTED</p>
                                                    <div className="mt-2 space-y-1 font-body text-sm">
                                                        <a href={team.submission.githubUrl} className="flex items-center gap-2 hover:underline">
                                                            <Github className="w-4 h-4" /> {team.submission.githubUrl}
                                                        </a>
                                                        <a href={team.submission.presentationUrl} className="flex items-center gap-2 hover:underline">
                                                            <ExternalLink className="w-4 h-4" /> {team.submission.presentationUrl}
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmitProject} className="space-y-4">
                                                    <input
                                                        type="url"
                                                        value={githubUrl}
                                                        onChange={e => setGithubUrl(e.target.value)}
                                                        placeholder="GitHub Repository URL"
                                                        className="input-carnival"
                                                        required
                                                    />
                                                    <input
                                                        type="url"
                                                        value={presentationUrl}
                                                        onChange={e => setPresentationUrl(e.target.value)}
                                                        placeholder="Presentation URL (Drive, YouTube, etc.)"
                                                        className="input-carnival"
                                                        required
                                                    />
                                                    <button type="submit" disabled={isSubmitting} className="btn-carnival btn-carnival-red w-full sm:w-auto">
                                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                        Submit
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Create Team */}
                                    <div>
                                        <h3 className="font-carnival text-xl text-[#1A1A2E] mb-4">
                                            ✨ Create Team
                                        </h3>
                                        <form onSubmit={handleCreateTeam} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Team Name"
                                                value={teamName}
                                                onChange={e => setTeamName(e.target.value)}
                                                className="input-carnival"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description (optional)"
                                                value={teamDescription}
                                                onChange={e => setTeamDescription(e.target.value)}
                                                className="input-carnival"
                                            />
                                            <button type="submit" className="btn-carnival btn-carnival-yellow w-full">
                                                <Plus className="w-5 h-5" /> Create
                                            </button>
                                        </form>
                                    </div>

                                    <div className="border-t-4 md:border-t-0 md:border-l-4 border-[#1A1A2E] pt-8 md:pt-0 md:pl-8">
                                        <h3 className="font-carnival text-xl text-[#1A1A2E] mb-4">
                                            🤝 Join Team
                                        </h3>
                                        <form onSubmit={handleJoinTeam} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Invite Code"
                                                value={inviteCode}
                                                onChange={e => setInviteCode(e.target.value.toUpperCase())}
                                                className="input-carnival font-mono text-center text-xl"
                                                maxLength={6}
                                                required
                                            />
                                            <button type="submit" className="btn-carnival btn-carnival-red w-full">
                                                <Users className="w-5 h-5" /> Join
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Food Tab */}
                    {activeTab === 'food' && (
                        <div>
                            <h3 className="font-carnival text-2xl text-[#1A1A2E] mb-6">🍕 Meal Pass</h3>

                            {user.paymentStatus === PaymentStatus.PAID ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* QR Code */}
                                    <div className="card-carnival p-8 text-center">
                                        <h4 className="font-carnival text-lg text-[#1A1A2E] mb-4">Your QR Code</h4>
                                        <div className="qr-container inline-block">
                                            <QRCode value={user.participantQrData || user.id} size={180} level="H" />
                                        </div>
                                        <p className="font-body text-sm text-[#1A1A2E] mt-4">Show this when collecting meals</p>
                                        <p className="font-mono text-xs text-[#1A1A2E] opacity-50 mt-2">ID: {user.id}</p>
                                    </div>

                                    {/* Meal Status */}
                                    <div className="space-y-4">
                                        <h4 className="font-carnival text-lg text-[#1A1A2E]">Meal Status</h4>

                                        {(['breakfast', 'lunch', 'dinner'] as const).map(meal => {
                                            const mealData = user.meals[meal];
                                            const icons = { breakfast: <Coffee className="w-6 h-6" />, lunch: <Sun className="w-6 h-6" />, dinner: <Moon className="w-6 h-6" /> };

                                            return (
                                                <div
                                                    key={meal}
                                                    className={`flex items-center justify-between p-4 border-3 border-[#1A1A2E] ${mealData.consumed
                                                            ? 'bg-gray-200'
                                                            : mealData.eligible
                                                                ? 'bg-[#FFD700]'
                                                                : 'bg-gray-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {icons[meal]}
                                                        <div>
                                                            <p className="font-carnival text-[#1A1A2E] uppercase">{meal}</p>
                                                            <p className="font-body text-xs text-[#1A1A2E]">
                                                                {mealData.consumed ? 'Collected ✓' : mealData.eligible ? 'Available' : 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`badge-carnival ${mealData.consumed ? 'badge-carnival-navy' : mealData.eligible ? 'bg-[#22C55E] text-white' : 'bg-gray-300'
                                                        }`}>
                                                        {mealData.consumed ? 'DONE' : mealData.eligible ? 'READY' : '—'}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="card-carnival bg-[#FF0000] p-8 text-center text-white">
                                    <Utensils className="w-16 h-16 mx-auto mb-4 opacity-80" />
                                    <h4 className="font-carnival text-xl mb-2">Payment Required</h4>
                                    <p className="font-body mb-4">Complete payment to access your meal QR code</p>
                                    <button onClick={() => setActiveTab('payment')} className="btn-carnival btn-carnival-yellow">
                                        Pay Now
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Payment Tab */}
                    {activeTab === 'payment' && (
                        <div className="max-w-lg mx-auto">
                            <div className="card-carnival overflow-hidden">
                                <div className="bg-[#1A1A2E] p-6 text-white">
                                    <h3 className="font-carnival text-xl flex items-center gap-2">
                                        <CreditCard className="w-6 h-6 text-[#FFD700]" /> Entry Fee
                                    </h3>
                                    <p className="font-body text-gray-300 mt-1">Srinathon 24Hr Hackathon</p>
                                </div>

                                <div className="p-6 bg-white">
                                    {user.paymentStatus === PaymentStatus.PAID ? (
                                        <div className="text-center py-8">
                                            <div className="w-20 h-20 bg-[#22C55E] border-4 border-[#1A1A2E] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Check className="w-10 h-10 text-white" />
                                            </div>
                                            <h4 className="font-carnival text-2xl text-[#1A1A2E] mb-1">All Set!</h4>
                                            <p className="font-body text-[#1A1A2E] mb-6">You're registered for Srinathon 🎊</p>
                                            <div className="qr-container inline-block">
                                                <QRCode value={user.participantQrData || user.id} size={100} level="H" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="border-b-3 border-[#1A1A2E] pb-4 mb-4">
                                                <div className="flex justify-between font-body text-[#1A1A2E]">
                                                    <span>Entry Fee</span>
                                                    <span className="font-carnival">₹{ENTRY_FEE_AMOUNT}</span>
                                                </div>
                                                <div className="flex justify-between font-body text-[#1A1A2E] mt-2 text-sm">
                                                    <span>Includes</span>
                                                    <span>All Meals + Swag</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between font-carnival text-xl text-[#1A1A2E] mb-6">
                                                <span>Total</span>
                                                <span className="text-[#FF0000]">₹{ENTRY_FEE_AMOUNT}</span>
                                            </div>

                                            <button
                                                onClick={handlePayment}
                                                disabled={isPaymentProcessing}
                                                className="w-full btn-carnival btn-carnival-red text-lg"
                                            >
                                                {isPaymentProcessing ? (
                                                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                                ) : (
                                                    <><CreditCard className="w-5 h-5" /> Pay ₹{ENTRY_FEE_AMOUNT}</>
                                                )}
                                            </button>

                                            <p className="font-body text-xs text-[#1A1A2E] text-center mt-4 opacity-50">
                                                Mock payment for demo
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
