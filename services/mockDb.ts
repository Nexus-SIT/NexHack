import { User, Team, Coupon, UserRole, CouponType, CouponStatus, Announcement } from '../types';

// Initial Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Hacker', email: 'alice@hack.com', role: UserRole.PARTICIPANT, teamId: 't1' },
  { id: 'u2', name: 'Bob Coder', email: 'bob@hack.com', role: UserRole.PARTICIPANT, teamId: 't1' },
  { id: 'u3', name: 'Charlie Design', email: 'charlie@hack.com', role: UserRole.PARTICIPANT }, // No team
  { id: 'admin1', name: 'Admin User', email: 'admin@hack.com', role: UserRole.ADMIN },
  { id: 'org1', name: 'Organizer Dave', email: 'org@hack.com', role: UserRole.ORGANIZER },
];

const MOCK_TEAMS: Team[] = [
  { id: 't1', name: 'The Null Pointers', description: 'Building the next gen AI toaster.', members: ['u1', 'u2'], createdAt: new Date().toISOString() }
];

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Hacking Begins!', message: 'The 24h timer has started. Good luck!', timestamp: new Date(Date.now() - 3600000).toISOString(), author: 'Admin' },
  { id: 'a2', title: 'Lunch Served', message: 'Pizza is available in the main hall.', timestamp: new Date().toISOString(), author: 'Organizer' }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth Services ---

export const login = async (email: string): Promise<User> => {
  await delay(800);
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) return user;
  
  // Auto-register mock for demo purposes if not found (simulates a relaxed hackathon auth)
  const newUser: User = {
    id: `u_${Date.now()}`,
    name: email.split('@')[0],
    email,
    role: email.includes('admin') ? UserRole.ADMIN : email.includes('org') ? UserRole.ORGANIZER : UserRole.PARTICIPANT
  };
  
  storeUser(newUser);
  // specific logic: if new participant, generate coupons
  if (newUser.role === UserRole.PARTICIPANT) {
    generateCouponsForUser(newUser.id);
  }
  return newUser;
};

// --- Data Access Helpers (LocalStorage Wrapper) ---

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('hackportal_users');
  return stored ? JSON.parse(stored) : MOCK_USERS;
};

const storeUser = (user: User) => {
  const users = getStoredUsers();
  localStorage.setItem('hackportal_users', JSON.stringify([...users, user]));
};

const updateUser = (updatedUser: User) => {
  const users = getStoredUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
  localStorage.setItem('hackportal_users', JSON.stringify(users));
};

export const getStoredTeams = (): Team[] => {
  const stored = localStorage.getItem('hackportal_teams');
  return stored ? JSON.parse(stored) : MOCK_TEAMS;
};

const storeTeam = (team: Team) => {
  const teams = getStoredTeams();
  localStorage.setItem('hackportal_teams', JSON.stringify([...teams, team]));
};

const updateTeam = (updatedTeam: Team) => {
  const teams = getStoredTeams().map(t => t.id === updatedTeam.id ? updatedTeam : t);
  localStorage.setItem('hackportal_teams', JSON.stringify(teams));
};

export const getStoredCoupons = (): Coupon[] => {
  const stored = localStorage.getItem('hackportal_coupons');
  return stored ? JSON.parse(stored) : [];
};

const saveCoupons = (coupons: Coupon[]) => {
  localStorage.setItem('hackportal_coupons', JSON.stringify(coupons));
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
  await delay(500);
  return MOCK_ANNOUNCEMENTS; // In a real app, fetch from DB
};

// --- Business Logic ---

export const generateCouponsForUser = (userId: string) => {
  const existing = getStoredCoupons();
  if (existing.some(c => c.userId === userId)) return; // Already exists

  const newCoupons: Coupon[] = [
    { id: `c_${userId}_bk`, userId, type: CouponType.BREAKFAST, status: CouponStatus.ACTIVE },
    { id: `c_${userId}_ln`, userId, type: CouponType.LUNCH, status: CouponStatus.ACTIVE },
    { id: `c_${userId}_dn`, userId, type: CouponType.DINNER, status: CouponStatus.ACTIVE },
  ];
  saveCoupons([...existing, ...newCoupons]);
};

export const getUserCoupons = async (userId: string): Promise<Coupon[]> => {
  await delay(400);
  return getStoredCoupons().filter(c => c.userId === userId);
};

export const redeemCoupon = async (couponId: string): Promise<boolean> => {
  await delay(600);
  const coupons = getStoredCoupons();
  const couponIndex = coupons.findIndex(c => c.id === couponId);
  
  if (couponIndex === -1) throw new Error("Coupon not found");
  if (coupons[couponIndex].status === CouponStatus.REDEEMED) throw new Error("Coupon already used");

  coupons[couponIndex].status = CouponStatus.REDEEMED;
  coupons[couponIndex].redeemedAt = new Date().toISOString();
  saveCoupons(coupons);
  return true;
};

export const createTeam = async (name: string, description: string, creatorId: string): Promise<Team> => {
  await delay(800);
  const newTeam: Team = {
    id: `t_${Date.now()}`,
    name,
    description,
    members: [creatorId],
    createdAt: new Date().toISOString()
  };
  storeTeam(newTeam);
  
  // Update user
  const users = getStoredUsers();
  const creator = users.find(u => u.id === creatorId);
  if (creator) {
    updateUser({ ...creator, teamId: newTeam.id });
  }
  
  return newTeam;
};

export const joinTeam = async (teamId: string, userId: string): Promise<boolean> => {
  await delay(600);
  const teams = getStoredTeams();
  const team = teams.find(t => t.id === teamId);
  
  if (!team) throw new Error("Team not found");
  if (team.members.length >= 4) throw new Error("Team is full");
  if (team.members.includes(userId)) throw new Error("Already a member");

  team.members.push(userId);
  updateTeam(team);

  const users = getStoredUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    updateUser({ ...user, teamId: team.id });
  }

  return true;
};

export const getTeamById = async (teamId: string): Promise<Team | undefined> => {
  await delay(300);
  return getStoredTeams().find(t => t.id === teamId);
};

export const getTeamMembers = async (memberIds: string[]): Promise<User[]> => {
  await delay(300);
  const allUsers = getStoredUsers();
  return allUsers.filter(u => memberIds.includes(u.id));
};

export const getAllStats = async () => {
  await delay(500);
  const users = getStoredUsers();
  const teams = getStoredTeams();
  const coupons = getStoredCoupons();
  
  return {
    totalUsers: users.length,
    totalTeams: teams.length,
    totalParticipants: users.filter(u => u.role === UserRole.PARTICIPANT).length,
    redeemedCoupons: coupons.filter(c => c.status === CouponStatus.REDEEMED).length,
    totalCoupons: coupons.length
  };
};

// Initialize mock DB on load if empty
if (!localStorage.getItem('hackportal_users')) {
  localStorage.setItem('hackportal_users', JSON.stringify(MOCK_USERS));
  localStorage.setItem('hackportal_teams', JSON.stringify(MOCK_TEAMS));
  // Generate coupons for initial mock users
  MOCK_USERS.filter(u => u.role === UserRole.PARTICIPANT).forEach(u => generateCouponsForUser(u.id));
}