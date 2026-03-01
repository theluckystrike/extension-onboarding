/**
 * Onboarding Flow — Multi-step welcome page
 */
export interface OnboardingStep {
    title: string; description: string; icon?: string; image?: string;
    action?: { label: string; onClick: () => void };
}

export class OnboardingFlow {
    private steps: OnboardingStep[];
    private currentStep = 0;
    private container: HTMLElement | null = null;
    private onComplete?: () => void;

    constructor(steps: OnboardingStep[], onComplete?: () => void) { this.steps = steps; this.onComplete = onComplete; }

    render(container: HTMLElement): void {
        this.container = container;
        this.showStep(0);
    }

    private showStep(index: number): void {
        if (!this.container) return;
        this.currentStep = index;
        const step = this.steps[index];
        this.container.innerHTML = '';
        this.container.style.cssText = 'font-family:-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:32px;text-align:center;';

        // Progress dots
        const dots = document.createElement('div');
        dots.style.cssText = 'display:flex;justify-content:center;gap:8px;margin-bottom:24px;';
        this.steps.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${i === index ? '#1a73e8' : '#ddd'};transition:background .2s;`;
            dots.appendChild(dot);
        });
        this.container.appendChild(dots);

        // Icon/Image
        if (step.icon) {
            const icon = document.createElement('div');
            icon.style.cssText = 'font-size:48px;margin-bottom:16px;';
            icon.textContent = step.icon;
            this.container.appendChild(icon);
        }

        // Title
        const title = document.createElement('h2');
        title.style.cssText = 'margin:0 0 8px;font-size:22px;font-weight:700;';
        title.textContent = step.title;
        this.container.appendChild(title);

        // Description
        const desc = document.createElement('p');
        desc.style.cssText = 'margin:0 0 24px;font-size:14px;color:#666;line-height:1.5;';
        desc.textContent = step.description;
        this.container.appendChild(desc);

        // Action button
        if (step.action) {
            const btn = document.createElement('button');
            btn.textContent = step.action.label;
            btn.style.cssText = 'padding:10px 24px;background:#1a73e8;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer;margin-bottom:16px;';
            btn.onclick = step.action.onClick;
            this.container.appendChild(btn);
        }

        // Navigation
        const nav = document.createElement('div');
        nav.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:16px;';

        if (index > 0) {
            const back = document.createElement('button');
            back.textContent = '← Back';
            back.style.cssText = 'padding:8px 16px;background:none;border:1px solid #ddd;border-radius:6px;cursor:pointer;font-size:13px;';
            back.onclick = () => this.showStep(index - 1);
            nav.appendChild(back);
        }

        const next = document.createElement('button');
        next.textContent = index === this.steps.length - 1 ? 'Get Started →' : 'Next →';
        next.style.cssText = 'padding:8px 16px;background:#1a73e8;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;';
        next.onclick = () => {
            if (index < this.steps.length - 1) this.showStep(index + 1);
            else this.onComplete?.();
        };
        nav.appendChild(next);
        this.container.appendChild(nav);
    }
}
