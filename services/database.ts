// ==========================================
// Database Service Layer
// ==========================================
// This provides a unified API that works with both Supabase and localStorage fallback
// For development without Supabase credentials, it falls back to localStorage

import { supabase, TABLES } from '@/lib/supabase';
import { generateId, generateInviteCode, delay, isValidGitHubUrl, isValidPresentationUrl } from '@/lib/utils';
import {
    User, Team, Announcement, PaymentStatus, UserRole, MealType, MealKey,
    MealConsumptionResult, DEFAULT_MEALS, MAX_TEAM_SIZE, ENTRY_FEE_AMOUNT
} from '@/types';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url && !url.includes('your-project');
};

// ==========================================
// Local Storage Fallback (for development)
// ==========================================

const STORAGE_KEYS = {
    USERS: 'hms_users',
    TEAMS: 'hms_teams',
    ANNOUNCEMENTS: 'hms_announcements',
    CURRENT_USER: 'hms_current_user'
};

// Initialize with mock data if empty
const initializeMockData = () => {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        const mockUsers: User[] = [
            {
                id: 'admin1',
                name: 'Admin User',
                email: 'admin@hack.com',
                role: UserRole.ADMIN,
                paymentStatus: PaymentStatus.PAID,
                meals: DEFAULT_MEALS,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'u1',
                name: 'Alice Hacker',
                email: 'alice@hack.com',
                role: UserRole.PARTICIPANT,
                teamId: 't1',
                paymentStatus: PaymentStatus.PAID,
                participantQrData: 'u1',
                meals: DEFAULT_MEALS,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'u2',
                name: 'Bob Coder',
                email: 'bob@hack.com',
                role: UserRole.PARTICIPANT,
                teamId: 't1',
                paymentStatus: PaymentStatus.PENDING,
                meals: { ...DEFAULT_MEALS },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    }

    if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
        const mockTeams: Team[] = [
            {
                id: 't1',
                name: 'The Null Pointers',
                description: 'Building the next gen AI toaster.',
                inviteCode: 'NP2024',
                leaderId: 'u1',
                members: ['u1', 'u2'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(mockTeams));
    }

    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
        const mockAnnouncements: Announcement[] = [
            {
                id: 'a1',
                title: 'Welcome to Nexothsav!',
                message: 'Get ready for Srinathon - our flagship 24-hour hackathon!',
                timestamp: new Date().toISOString(),
                author: 'Admin'
            }
        ];
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(mockAnnouncements));
    }
};

// Storage helpers
const getStoredUsers = (): User[] => {
    if (typeof window === 'undefined') return [];
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getStoredTeams = (): Team[] => {
    if (typeof window === 'undefined') return [];
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return stored ? JSON.parse(stored) : [];
};

const saveTeams = (teams: Team[]) => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
};

// ==========================================
// Auth Services
// ==========================================

export async function loginUser(email: string): Promise<User> {
    await delay(500);

    const users = getStoredUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        // Auto-register for demo
        const isAdmin = email.toLowerCase().includes('admin');
        const isOrg = email.toLowerCase().includes('org');

        user = {
            id: generateId('u'),
            name: email.split('@')[0],
            email,
            role: isAdmin ? UserRole.ADMIN : isOrg ? UserRole.ORGANIZER : UserRole.PARTICIPANT,
            paymentStatus: PaymentStatus.PENDING,
            meals: { ...DEFAULT_MEALS },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        saveUsers([...users, user]);
    }

    return user;
}

export async function getCurrentUser(userId: string): Promise<User | null> {
    const users = getStoredUsers();
    return users.find(u => u.id === userId) || null;
}

// ==========================================
// Team Services
// ==========================================

export async function createTeam(name: string, description: string, creatorId: string): Promise<Team> {
    await delay(500);

    const users = getStoredUsers();
    const creator = users.find(u => u.id === creatorId);
    if (!creator) throw new Error('User not found');
    if (creator.teamId) throw new Error('You are already in a team');

    const teams = getStoredTeams();

    // Generate unique invite code
    let inviteCode = generateInviteCode();
    while (teams.some(t => t.inviteCode === inviteCode)) {
        inviteCode = generateInviteCode();
    }

    const newTeam: Team = {
        id: generateId('t'),
        name,
        description,
        inviteCode,
        leaderId: creatorId,
        members: [creatorId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    saveTeams([...teams, newTeam]);

    // Update creator's teamId
    const updatedUsers = users.map(u =>
        u.id === creatorId ? { ...u, teamId: newTeam.id, updatedAt: new Date().toISOString() } : u
    );
    saveUsers(updatedUsers);

    return newTeam;
}

export async function joinTeamByCode(inviteCode: string, userId: string): Promise<Team> {
    await delay(500);

    const users = getStoredUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    if (user.teamId) throw new Error('You are already in a team');

    const teams = getStoredTeams();
    const team = teams.find(t => t.inviteCode.toUpperCase() === inviteCode.toUpperCase());

    if (!team) throw new Error('Invalid invite code');
    if (team.members.length >= MAX_TEAM_SIZE) throw new Error('Team is full (max 4 members)');
    if (team.members.includes(userId)) throw new Error('Already a member');

    // Update team
    const updatedTeams = teams.map(t =>
        t.id === team.id
            ? { ...t, members: [...t.members, userId], updatedAt: new Date().toISOString() }
            : t
    );
    saveTeams(updatedTeams);

    // Update user
    const updatedUsers = users.map(u =>
        u.id === userId ? { ...u, teamId: team.id, updatedAt: new Date().toISOString() } : u
    );
    saveUsers(updatedUsers);

    return { ...team, members: [...team.members, userId] };
}

export async function getTeamById(teamId: string): Promise<Team | null> {
    const teams = getStoredTeams();
    return teams.find(t => t.id === teamId) || null;
}

export async function getTeamMembers(memberIds: string[]): Promise<User[]> {
    const users = getStoredUsers();
    return users.filter(u => memberIds.includes(u.id));
}

export async function submitProject(
    teamId: string,
    leaderId: string,
    githubUrl: string,
    presentationUrl: string
): Promise<Team> {
    await delay(500);

    const teams = getStoredTeams();
    const team = teams.find(t => t.id === teamId);

    if (!team) throw new Error('Team not found');
    if (team.leaderId !== leaderId) throw new Error('Only team leader can submit');
    if (!isValidGitHubUrl(githubUrl)) throw new Error('Invalid GitHub URL');
    if (!isValidPresentationUrl(presentationUrl)) throw new Error('Invalid presentation URL');

    const updatedTeam: Team = {
        ...team,
        submission: {
            githubUrl,
            presentationUrl,
            submittedAt: new Date().toISOString()
        },
        updatedAt: new Date().toISOString()
    };

    const updatedTeams = teams.map(t => t.id === teamId ? updatedTeam : t);
    saveTeams(updatedTeams);

    return updatedTeam;
}

// ==========================================
// Payment Services
// ==========================================

export async function processPayment(userId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000); // Simulate payment processing

    const users = getStoredUsers();
    const user = users.find(u => u.id === userId);

    if (!user) throw new Error('User not found');
    if (user.paymentStatus === PaymentStatus.PAID) {
        return { success: true, message: 'Already paid' };
    }

    // Update user payment status and generate QR data
    const updatedUsers = users.map(u =>
        u.id === userId
            ? {
                ...u,
                paymentStatus: PaymentStatus.PAID,
                participantQrData: u.id, // QR contains user ID
                meals: { ...DEFAULT_MEALS }, // Enable all meals on payment
                updatedAt: new Date().toISOString()
            }
            : u
    );
    saveUsers(updatedUsers);

    return { success: true, message: `Payment of ₹${ENTRY_FEE_AMOUNT} successful!` };
}

export async function getPaymentStatus(userId: string): Promise<PaymentStatus> {
    const users = getStoredUsers();
    const user = users.find(u => u.id === userId);
    return user?.paymentStatus || PaymentStatus.PENDING;
}

// ==========================================
// Meal Services (Critical - Atomic Operations)
// ==========================================

// Lock mechanism for atomic operations (simple in-memory lock)
let mealLocks: Set<string> = new Set();

export async function consumeMeal(
    userId: string,
    mealType: MealType
): Promise<MealConsumptionResult> {
    const lockKey = `${userId}_${mealType}`;

    // Check for lock (prevent race conditions)
    if (mealLocks.has(lockKey)) {
        return { success: false, message: 'Operation in progress, please wait' };
    }

    try {
        mealLocks.add(lockKey);
        await delay(300);

        const users = getStoredUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Check if user is PAID
        if (user.paymentStatus !== PaymentStatus.PAID) {
            return {
                success: false,
                message: 'NOT ELIGIBLE - Payment required',
                userName: user.name
            };
        }

        const mealKey = mealType.toLowerCase() as MealKey;
        const mealStatus = user.meals[mealKey];

        // Check eligibility
        if (!mealStatus.eligible) {
            return {
                success: false,
                message: 'NOT ELIGIBLE - Meal not included',
                mealType,
                userName: user.name
            };
        }

        // Check if already consumed
        if (mealStatus.consumed) {
            return {
                success: false,
                message: 'ALREADY EATEN - Meal already redeemed',
                mealType,
                userName: user.name
            };
        }

        // Mark as consumed (atomic update)
        const updatedUsers = users.map(u => {
            if (u.id === userId) {
                return {
                    ...u,
                    meals: {
                        ...u.meals,
                        [mealKey]: {
                            ...u.meals[mealKey],
                            consumed: true,
                            consumedAt: new Date().toISOString()
                        }
                    },
                    updatedAt: new Date().toISOString()
                };
            }
            return u;
        });

        saveUsers(updatedUsers);

        return {
            success: true,
            message: 'APPROVED - Enjoy your meal!',
            mealType,
            userName: user.name
        };

    } finally {
        mealLocks.delete(lockKey);
    }
}

export async function getUserMeals(userId: string): Promise<User['meals'] | null> {
    const users = getStoredUsers();
    const user = users.find(u => u.id === userId);
    return user?.meals || null;
}

// ==========================================
// Admin/Stats Services
// ==========================================

export async function getAllStats() {
    await delay(300);

    const users = getStoredUsers();
    const teams = getStoredTeams();

    const participants = users.filter(u => u.role === UserRole.PARTICIPANT);
    const paidUsers = participants.filter(u => u.paymentStatus === PaymentStatus.PAID);

    let mealsConsumed = { breakfast: 0, lunch: 0, dinner: 0 };
    paidUsers.forEach(u => {
        if (u.meals.breakfast.consumed) mealsConsumed.breakfast++;
        if (u.meals.lunch.consumed) mealsConsumed.lunch++;
        if (u.meals.dinner.consumed) mealsConsumed.dinner++;
    });

    return {
        totalUsers: users.length,
        totalParticipants: participants.length,
        paidParticipants: paidUsers.length,
        totalTeams: teams.length,
        mealsConsumed,
        totalMealsServed: mealsConsumed.breakfast + mealsConsumed.lunch + mealsConsumed.dinner
    };
}

export async function getAnnouncements(): Promise<Announcement[]> {
    if (typeof window === 'undefined') return [];
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return stored ? JSON.parse(stored) : [];
}

export async function getUserById(userId: string): Promise<User | null> {
    const users = getStoredUsers();
    return users.find(u => u.id === userId) || null;
}

// Re-export for compatibility
export { getStoredTeams };
