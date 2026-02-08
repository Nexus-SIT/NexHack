// ==========================================
// Utility Functions
// ==========================================

/**
 * Generate a unique 6-character invite code for teams
 */
export function generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars like 0,O,1,I
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = ''): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return prefix ? `${prefix}_${timestamp}${randomPart}` : `${timestamp}${randomPart}`;
}

/**
 * Validate GitHub repository URL
 */
export function isValidGitHubUrl(url: string): boolean {
    const pattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/i;
    return pattern.test(url);
}

/**
 * Validate Google Drive or presentation URL
 */
export function isValidPresentationUrl(url: string): boolean {
    const patterns = [
        /^https?:\/\/(www\.)?drive\.google\.com\//i,
        /^https?:\/\/(www\.)?docs\.google\.com\//i,
        /^https?:\/\/(www\.)?youtube\.com\//i,
        /^https?:\/\/(www\.)?youtu\.be\//i,
        /^https?:\/\/(www\.)?canva\.com\//i,
        /^https?:\/\/(www\.)?figma\.com\//i,
        /^https?:\/\/(www\.)?pitch\.com\//i,
    ];
    return patterns.some(pattern => pattern.test(url));
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Get current meal session based on time
 */
export function getCurrentMealSession(): 'breakfast' | 'lunch' | 'dinner' {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    return 'dinner';
}

/**
 * Simulate network delay (for mock services)
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
