'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, ArrowRight, Sparkles, PartyPopper } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';
import { UserRole } from '@/types';

export default function Login() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setError('');
        setIsSubmitting(true);

        try {
            const user = await login(email);
            if (user.role === UserRole.PARTICIPANT) {
                router.push('/dashboard');
            } else {
                router.push('/admin');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const quickLogin = async (email: string) => {
        setEmail(email);
        setIsSubmitting(true);
        try {
            const user = await login(email);
            if (user.role === UserRole.PARTICIPANT) {
                router.push('/dashboard');
            } else {
                router.push('/admin');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout user={null} onLogout={() => { }}>
            <div className="block-blue min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 pattern-dots opacity-10"></div>

                <div className="w-full max-w-md relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD700] border-4 border-[#1A1A2E] rounded-full mb-4 shadow-[4px_4px_0_#1A1A2E]">
                            <PartyPopper className="w-10 h-10 text-[#FF0000]" />
                        </div>
                        <h1 className="font-carnival text-3xl sm:text-4xl text-[#1A1A2E]">
                            Join the Party!
                        </h1>
                        <p className="font-body text-[#1A1A2E] mt-2">
                            Sign in to access Nexothsav portal
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="card-carnival p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block font-carnival text-sm text-[#1A1A2E] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A2E] opacity-50 w-5 h-5" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="input-carnival pl-12"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-[#FF0000] text-white font-body p-3 border-2 border-[#1A1A2E]">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || !email.trim()}
                                className="w-full btn-carnival btn-carnival-yellow disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Entering...
                                    </>
                                ) : (
                                    <>
                                        Let's Go!
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Quick Login */}
                        <div className="mt-8 pt-6 border-t-3 border-[#1A1A2E]">
                            <p className="font-carnival text-sm text-center text-[#1A1A2E] mb-4">
                                Quick Demo Login
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => quickLogin('alice@hack.com')}
                                    disabled={isSubmitting}
                                    className="btn-carnival btn-carnival-white text-sm py-2 disabled:opacity-50"
                                >
                                    👤 Participant
                                </button>
                                <button
                                    onClick={() => quickLogin('admin@hack.com')}
                                    disabled={isSubmitting}
                                    className="btn-carnival btn-carnival-navy text-sm py-2 disabled:opacity-50"
                                >
                                    🛡️ Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-6 text-center font-body text-sm text-[#1A1A2E]">
                        New users are automatically registered on first login 🎊
                    </p>
                </div>
            </div>
        </Layout>
    );
}
