'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/mockDb';
import { User, UserRole } from '@/types';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user, login: authLogin, logout, isLoading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && user) {
            router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin');
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!email) throw new Error('Email is required');
            const loggedInUser = await login(email);
            authLogin(loggedInUser);
            router.push(loggedInUser.role === 'PARTICIPANT' ? '/dashboard' : '/admin');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <Layout user={null} onLogout={() => { }}>
                <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (user) {
        return null;
    }

    return (
        <Layout user={user} onLogout={logout}>
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Sign in to NexHackPortal
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or enter <code className="bg-gray-100 px-1 rounded">admin@hack.com</code> to test admin features.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Sign In / Register'
                                )}
                            </button>
                        </div>

                        <div className="text-xs text-center text-gray-500 mt-4">
                            Note: This is a demo. Entering a new email will auto-register a participant account.
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
