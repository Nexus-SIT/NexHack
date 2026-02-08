'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ScanLine, Check, X, AlertCircle, RefreshCw, Coffee, Sun, Moon, Loader2 } from 'lucide-react';
import { MealType, MealConsumptionResult, UserRole } from '@/types';
import { consumeMeal } from '@/services/database';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

export default function ScannerPage() {
    const router = useRouter();
    const { user, logout, isLoading: authLoading } = useAuth();

    const [selectedMeal, setSelectedMeal] = useState<MealType>(MealType.LUNCH);
    const [participantId, setParticipantId] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [lastResult, setLastResult] = useState<MealConsumptionResult | null>(null);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!participantId.trim()) return;

        setIsScanning(true);
        setLastResult(null);

        try {
            const result = await consumeMeal(participantId.trim(), selectedMeal);
            setLastResult(result);
            if (result.success) {
                setParticipantId('');
            }
        } catch (err: any) {
            setLastResult({
                success: false,
                message: err.message || 'Scan failed',
                participantName: '',
                mealType: selectedMeal
            });
        } finally {
            setIsScanning(false);
        }
    };

    const mealOptions = [
        { type: MealType.BREAKFAST, label: 'Breakfast', icon: Coffee, emoji: '🌅' },
        { type: MealType.LUNCH, label: 'Lunch', icon: Sun, emoji: '☀️' },
        { type: MealType.DINNER, label: 'Dinner', icon: Moon, emoji: '🌙' },
    ];

    if (authLoading) {
        return (
            <Layout user={null} onLogout={() => { }}>
                <div className="block-blue flex justify-center items-center h-96">
                    <Loader2 className="w-10 h-10 animate-spin text-[#FFD700]" />
                </div>
            </Layout>
        );
    }

    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.ORGANIZER)) {
        return (
            <Layout user={user} onLogout={logout}>
                <div className="block-blue py-12 text-center min-h-[60vh] flex flex-col items-center justify-center">
                    <div className="card-carnival bg-[#FF0000] p-8 text-white max-w-md mx-auto">
                        <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                        <h2 className="font-carnival text-2xl mb-2">Access Denied</h2>
                        <p className="font-body">Only admins can access the scanner</p>
                        <button
                            onClick={() => router.push('/')}
                            className="btn-carnival btn-carnival-yellow mt-6"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout user={user} onLogout={logout}>
            {/* Header */}
            <section className="block-navy py-4 border-b-4 border-[#FFD700]">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/admin')}
                            className="btn-carnival btn-carnival-yellow py-2 px-3"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <h1 className="font-carnival text-xl text-[#FFD700]">🔍 Food Scanner</h1>
                            <p className="font-body text-sm text-gray-300">Scan participant QR codes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meal Selector */}
            <section className="block-yellow py-6 border-b-4 border-[#1A1A2E]">
                <div className="max-w-2xl mx-auto px-4">
                    <p className="font-carnival text-sm text-[#1A1A2E] mb-3">SELECT MEAL SESSION</p>
                    <div className="grid grid-cols-3 gap-3">
                        {mealOptions.map((meal) => (
                            <button
                                key={meal.type}
                                onClick={() => setSelectedMeal(meal.type)}
                                className={`p-4 border-3 border-[#1A1A2E] text-center transition-all ${selectedMeal === meal.type
                                        ? 'bg-[#FF0000] text-white shadow-[4px_4px_0_#1A1A2E] transform -translate-y-1'
                                        : 'bg-white text-[#1A1A2E] hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-2xl">{meal.emoji}</span>
                                <p className="font-carnival text-sm mt-1">{meal.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scanner */}
            <section className="block-blue py-8 min-h-[50vh]">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Scan Result */}
                    {lastResult && (
                        <div className={`mb-6 p-6 border-4 border-[#1A1A2E] ${lastResult.success
                                ? 'bg-[#22C55E]'
                                : 'bg-[#FF0000]'
                            } text-white`}
                            style={{ boxShadow: '6px 6px 0 #1A1A2E' }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 flex items-center justify-center border-3 border-white ${lastResult.success ? 'bg-white/20' : 'bg-white/20'
                                    }`}>
                                    {lastResult.success ? (
                                        <Check className="w-10 h-10" />
                                    ) : (
                                        <X className="w-10 h-10" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-carnival text-2xl">
                                        {lastResult.success ? '✓ APPROVED' : '✗ DENIED'}
                                    </p>
                                    {lastResult.participantName && (
                                        <p className="font-body text-lg">{lastResult.participantName}</p>
                                    )}
                                    <p className="font-body text-sm opacity-80">{lastResult.message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Manual Input */}
                    <div className="card-carnival p-6">
                        <h3 className="font-carnival text-lg text-[#1A1A2E] mb-4">
                            Enter Participant ID
                        </h3>
                        <form onSubmit={handleScan} className="space-y-4">
                            <input
                                type="text"
                                value={participantId}
                                onChange={(e) => setParticipantId(e.target.value)}
                                placeholder="Scan QR or enter ID..."
                                className="input-carnival text-center text-lg font-mono"
                                disabled={isScanning}
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isScanning || !participantId.trim()}
                                className="w-full btn-carnival btn-carnival-red text-lg py-4 disabled:opacity-50"
                            >
                                {isScanning ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Scanning...
                                    </>
                                ) : (
                                    <>
                                        <ScanLine className="w-5 h-5" />
                                        Scan {selectedMeal.charAt(0) + selectedMeal.slice(1).toLowerCase()}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 card-carnival-yellow p-4">
                        <h4 className="font-carnival text-sm text-[#1A1A2E]">📝 Instructions</h4>
                        <ul className="font-body text-sm text-[#1A1A2E] mt-2 space-y-1">
                            <li>1. Select the current meal session above</li>
                            <li>2. Scan participant's QR code or enter their ID</li>
                            <li>3. System will verify payment & meal status</li>
                            <li>4. Only APPROVED participants can collect meals</li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
