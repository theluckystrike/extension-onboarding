# extension-onboarding — Onboarding Framework for Chrome Extensions

[![npm](https://img.shields.io/npm/v/extension-onboarding.svg)](https://www.npmjs.com/package/extension-onboarding)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green.svg)]()

> **Built by [Zovo](https://zovo.one)** — onboarding for 18+ Chrome extensions

**Multi-step onboarding flows, feature tours, and completion tracking** for Chrome extensions. Beautiful UI with zero dependencies.

## 📦 Install

```bash
npm install extension-onboarding
```

## 🚀 Quick Start

```typescript
import { OnboardingFlow, FeatureTour, OnboardingTracker } from 'extension-onboarding';

// Track onboarding completion
const tracker = new OnboardingTracker();
if (await tracker.shouldShow()) {
    const flow = new OnboardingFlow([
        { 
            title: 'Welcome!', 
            description: 'Get started in 30 seconds', 
            icon: '🎉' 
        },
        { 
            title: 'Pin to Toolbar', 
            description: 'Click the puzzle icon to pin', 
            icon: '📌' 
        },
    ], () => tracker.markCompleted());
    flow.render(document.getElementById('app')!);
}
```

## ✨ Features

### OnboardingFlow

Multi-step wizard with progress tracking:

```typescript
const flow = new OnboardingFlow([
    { title: 'Welcome', description: '...', icon: '🎉' },
    { title: 'Step 2', description: '...', icon: '⚡' },
    { title: 'Done', description: 'You\'re ready!', icon: '✅' },
], onComplete, options);

// Render to DOM
flow.render(container);

// Navigate programmatically
flow.next();
flow.prev();
flow.goToStep(2);
```

### FeatureTour

Highlight specific UI elements:

```typescript
const tour = new FeatureTour([
    { target: '#settings-btn', content: 'Configure your settings' },
    { target: '.save-button', content: 'Save your changes' },
]);
tour.start();
```

### OnboardingTracker

Track completion status:

```typescript
const tracker = new OnboardingTracker();

// Check if should show
if (await tracker.shouldShow()) {
    // Show onboarding
}

// Mark as complete
await tracker.markCompleted();

// Reset for testing
await tracker.reset();
```

## Options

```typescript
interface OnboardingOptions {
    showProgress?: boolean;      // Show step indicators (default: true)
    allowSkip?: boolean;         // Allow skipping (default: true)
    animationDuration?: number;  // Transition ms (default: 300)
    theme?: 'light' | 'dark';    // Color scheme (default: 'light')
}
```

## 📄 License

MIT — [Zovo](https://zovo.one)
