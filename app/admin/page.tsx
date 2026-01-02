'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { User, CouponType, CouponStatus, UserRole } from '@/types';
import { getAllStats, redeemCoupon, getStoredCoupons } from '@/services/mockDb';
import { ScanLine, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

// Dynamic imports for Recharts to avoid SSR issues
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout, isLoading: authLoading } = useAuth();

    const [stats, setStats] = useState<any>(null);
    const [scanInput, setScanInput] = useState('');
    const [scanResult, setScanResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
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

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await redeemCoupon(scanInput);
            setScanResult({ status: 'success', message: `Coupon ${scanInput} redeemed successfully!` });
            setScanInput('');
            loadStats();

            setTimeout(() => setScanResult(null), 3000);
        } catch (err: any) {
            setScanResult({ status: 'error', message: err.message });
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout user={user} onLogout={logout}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {user.role === 'ADMIN' ? 'Admin Dashboard' : 'Organizer Dashboard'}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* QR Scanner Simulator */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center mb-6">
                            <div className="p-3 bg-indigo-100 rounded-full mr-4">
                                <ScanLine className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Scan Coupon</h3>
                                <p className="text-sm text-gray-500">Enter Coupon ID to simulate scan</p>
                            </div>
                        </div>

                        <form onSubmit={handleScan} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={scanInput}
                                    onChange={(e) => setScanInput(e.target.value)}
                                    placeholder="e.g. c_u1_ln"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none"
                            >
                                Redeem Coupon
                            </button>
                        </form>

                        {scanResult && (
                            <div className={`mt-4 p-4 rounded-md flex items-start ${scanResult.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                }`}>
                                {scanResult.status === 'success' ? (
                                    <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                                )}
                                <span>{scanResult.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Key Stats Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Participants</p>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">{stats?.totalParticipants || 0}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Teams Formed</p>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">{stats?.totalTeams || 0}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Meals Served</p>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">{stats?.redeemedCoupons || 0}</p>
                            <p className="text-xs text-gray-400 mt-1">/ {stats?.totalCoupons || 0} coupons</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Check-in Rate</p>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">
                                {stats && stats.totalCoupons > 0 ? Math.round((stats.redeemedCoupons / stats.totalCoupons) * 100) : 0}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Meal Distribution</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: 'Breakfast', redeemed: 12, total: 50 },
                                    { name: 'Lunch', redeemed: 45, total: 50 },
                                    { name: 'Dinner', redeemed: 5, total: 50 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="redeemed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="total" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">User Roles</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Participants', value: stats?.totalParticipants || 0 },
                                            { name: 'Organizers', value: 5 },
                                            { name: 'Admins', value: 2 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {COLORS.map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
