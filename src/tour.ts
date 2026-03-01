/**
 * Feature Tour — Spotlight tooltips for UI features
 */
export class FeatureTour {
    private steps: Array<{ selector: string; title: string; description: string; position?: 'top' | 'bottom' | 'left' | 'right' }> = [];
    private currentIndex = 0;
    private overlay: HTMLElement | null = null;

    add(selector: string, title: string, description: string, position?: 'top' | 'bottom' | 'left' | 'right'): this {
        this.steps.push({ selector, title, description, position: position || 'bottom' });
        return this;
    }

    start(): void { this.currentIndex = 0; this.showStep(0); }

    private showStep(index: number): void {
        this.cleanup();
        if (index >= this.steps.length) return;
        const step = this.steps[index];
        const target = document.querySelector(step.selector);
        if (!target) { this.showStep(index + 1); return; }

        const rect = (target as HTMLElement).getBoundingClientRect();

        // Overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:99998;';
        document.body.appendChild(this.overlay);

        // Spotlight
        const spot = document.createElement('div');
        spot.style.cssText = `position:fixed;top:${rect.top - 4}px;left:${rect.left - 4}px;width:${rect.width + 8}px;height:${rect.height + 8}px;border:2px solid #1a73e8;border-radius:8px;z-index:99999;box-shadow:0 0 0 9999px rgba(0,0,0,0.5);`;
        document.body.appendChild(spot);

        // Tooltip
        const tip = document.createElement('div');
        tip.style.cssText = `position:fixed;z-index:100000;background:white;padding:16px;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,0.2);max-width:280px;top:${rect.bottom + 12}px;left:${rect.left}px;`;
        tip.innerHTML = `
      <div style="font-size:14px;font-weight:600;margin-bottom:4px;">${step.title}</div>
      <div style="font-size:12px;color:#666;margin-bottom:12px;">${step.description}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;color:#aaa;">${index + 1}/${this.steps.length}</span>
        <button style="padding:6px 14px;background:#1a73e8;color:white;border:none;border-radius:6px;font-size:12px;cursor:pointer;" id="__tour_next__">${index === this.steps.length - 1 ? 'Done' : 'Next'}</button>
      </div>`;
        document.body.appendChild(tip);

        tip.querySelector('#__tour_next__')!.addEventListener('click', () => {
            this.cleanup();
            spot.remove(); tip.remove();
            this.showStep(index + 1);
        });
    }

    private cleanup(): void {
        this.overlay?.remove(); this.overlay = null;
    }
}
