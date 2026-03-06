# extension-onboarding

Onboarding framework for Chrome extensions. Multi-step welcome flows, spotlight feature tours, and completion tracking using chrome.storage. Zero dependencies. Written in TypeScript.

INSTALL

```bash
npm install extension-onboarding
```

QUICK START

```typescript
import { OnboardingFlow, FeatureTour, OnboardingTracker } from 'extension-onboarding';

const tracker = new OnboardingTracker();

if (await tracker.shouldShow()) {
    const flow = new OnboardingFlow([
        { title: 'Welcome', description: 'Get started in 30 seconds', icon: '🎉' },
        { title: 'Pin to Toolbar', description: 'Click the puzzle icon to pin', icon: '📌' },
    ], () => tracker.markCompleted());

    flow.render(document.getElementById('app')!);
}
```

API

OnboardingFlow

Renders a multi-step wizard with progress dots, back/next navigation, and an optional action button per step.

```typescript
interface OnboardingStep {
    title: string;
    description: string;
    icon?: string;
    image?: string;
    action?: { label: string; onClick: () => void };
}

const flow = new OnboardingFlow(steps: OnboardingStep[], onComplete?: () => void);
flow.render(container: HTMLElement);
```

The constructor takes an array of steps and an optional completion callback. Call render() to mount the wizard into a DOM element. Navigation buttons are generated automatically. The final step shows "Get Started" instead of "Next" and fires the onComplete callback.

FeatureTour

Highlights UI elements one at a time with a spotlight overlay and tooltip. Uses a chainable add() method.

```typescript
const tour = new FeatureTour();

tour
    .add('#settings-btn', 'Settings', 'Configure your preferences', 'bottom')
    .add('.save-button', 'Save', 'Click here to save changes', 'right')
    .start();
```

add() accepts a CSS selector, title, description, and an optional position (top, bottom, left, or right). Defaults to bottom. The tour auto-advances if a target element is missing from the DOM.

OnboardingTracker

Persists onboarding completion state in chrome.storage.local. Pass a custom storage key to the constructor if you run multiple onboarding flows.

```typescript
const tracker = new OnboardingTracker('__onboarding__');

await tracker.shouldShow();    // true if not yet completed
await tracker.isCompleted();   // boolean
await tracker.markCompleted(); // saves { completed: true, completedAt: timestamp }
await tracker.reset();         // clears stored state
```

REQUIREMENTS

Your manifest.json must declare the storage permission for OnboardingTracker to work.

```json
{
    "permissions": ["storage"]
}
```

DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/extension-onboarding.git
cd extension-onboarding
npm install
npm run build
npm test
```

LICENSE

MIT. See LICENSE file for details.

Built by theluckystrike. Learn more at zovo.one.
