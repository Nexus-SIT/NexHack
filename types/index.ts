// ==========================================
// Hackathon Management System - Type Definitions
// ==========================================

// === Enums ===

export enum UserRole {
    PARTICIPANT = 'PARTICIPANT',
    ORGANIZER = 'ORGANIZER',
    ADMIN = 'ADMIN'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED'
}

export enum MealType {
    BREAKFAST = 'BREAKFAST',
    LUNCH = 'LUNCH',
    DINNER = 'DINNER'
}

// === Meal Tracking ===

export interface MealStatus {
    eligible: boolean;
    consumed: boolean;
    consumedAt?: string;
}

export interface MealsTracking {
    breakfast: MealStatus;
    lunch: MealStatus;
    dinner: MealStatus;
}

// === User Model ===

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    teamId?: string;
    paymentStatus: PaymentStatus;
    participantQrData?: string; // User ID encoded in QR
    meals: MealsTracking;
    createdAt: string;
    updatedAt: string;
}

// === Team Model ===

export interface TeamSubmission {
    githubUrl: string;
    presentationUrl: string;
    submittedAt: string;
}

export interface Team {
    id: string;
    name: string;
    description: string;
    inviteCode: string; // 6-char unique code for joining
    leaderId: string;
    members: string[]; // User IDs (max 4)
    submission?: TeamSubmission;
    createdAt: string;
    updatedAt: string;
}

// === Payment ===

export interface PaymentIntent {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    createdAt: string;
}

export interface PaymentResult {
    success: boolean;
    paymentId: string;
    message: string;
}

// === Announcement ===

export interface Announcement {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    author: string;
}

// === Auth State ===

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// === Meal Consumption Result ===

export interface MealConsumptionResult {
    success: boolean;
    message: string;
    mealType?: MealType;
    userName?: string;
    participantName?: string;
}

// === API Response Types ===

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}

// === Utility Types ===

export type MealKey = 'breakfast' | 'lunch' | 'dinner';

// === Default Values ===

export const DEFAULT_MEALS: MealsTracking = {
    breakfast: { eligible: true, consumed: false },
    lunch: { eligible: true, consumed: false },
    dinner: { eligible: true, consumed: false }
};

export const ENTRY_FEE_AMOUNT = 500; // INR
export const MAX_TEAM_SIZE = 4;
