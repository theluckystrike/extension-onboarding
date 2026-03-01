# extension-onboarding — Onboarding Framework for Chrome Extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Built by [Zovo](https://zovo.one)**

**Multi-step onboarding flows, feature tours, and completion tracking** for Chrome extensions. Beautiful UI with zero dependencies.

## 🚀 Quick Start
```typescript
import { OnboardingFlow, FeatureTour, OnboardingTracker } from 'extension-onboarding';
const tracker = new OnboardingTracker();
if (await tracker.shouldShow()) {
  const flow = new OnboardingFlow([
    { title: 'Welcome!', description: 'Get started in 30 seconds', icon: '🎉' },
    { title: 'Pin to Toolbar', description: 'Click the puzzle icon', icon: '📌' },
  ], () => tracker.markCompleted());
  flow.render(document.getElementById('app')!);
}
```

## 📄 License
MIT — [Zovo](https://zovo.one)
