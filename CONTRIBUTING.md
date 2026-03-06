# Contributing to extension-onboarding

Thanks for your interest. This document covers everything you need to get started.

GETTING STARTED

1. Fork the repo on GitHub
2. Clone your fork locally

```bash
git clone https://github.com/YOUR_USERNAME/extension-onboarding.git
cd extension-onboarding
npm install
```

3. Create a feature branch from main

```bash
git checkout -b your-feature-name
```

DEVELOPMENT WORKFLOW

Build the project with TypeScript.

```bash
npm run build
```

Run tests before submitting.

```bash
npm test
```

PULL REQUESTS

- Keep PRs focused on a single change
- Write clear commit messages
- Make sure the build passes and tests are green
- Update documentation if you change the public API

CODE STYLE

- TypeScript strict mode is enabled
- Keep things simple and readable
- No external runtime dependencies

REPORTING ISSUES

Open an issue on GitHub with a clear title and description. Include steps to reproduce if reporting a bug. Mention your browser version and extension manifest version if relevant.

LICENSE

By contributing you agree that your contributions will be licensed under the MIT license.
