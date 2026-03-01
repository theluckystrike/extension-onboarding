/**
 * Onboarding Tracker — Track onboarding completion state
 */
export class OnboardingTracker {
    private key: string;
    constructor(key: string = '__onboarding__') { this.key = key; }

    async isCompleted(): Promise<boolean> {
        const result = await chrome.storage.local.get(this.key);
        return !!(result[this.key] as Record<string, unknown>)?.completed;
    }

    async markCompleted(): Promise<void> {
        await chrome.storage.local.set({ [this.key]: { completed: true, completedAt: Date.now() } });
    }

    async reset(): Promise<void> { await chrome.storage.local.remove(this.key); }

    async shouldShow(): Promise<boolean> { return !(await this.isCompleted()); }
}
