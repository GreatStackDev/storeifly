# Contributing to StoreiFly Frontend

Thank you for your interest in contributing to StoreiFly Frontend. We welcome community contributions, bug reports, and feature proposals.

Please review the guidelines below to ensure a smooth contribution process.

---

## Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating in discussions or opening pull requests.

---

## Development Workflow

### 1. Fork and Clone
1. Fork the repository to your own GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/storeifly-frontend.git
   cd storeifly-frontend
   ```

### 2. Create a Feature Branch
Create a descriptive branch for your work:
```bash
git checkout -b feat/add-store-filter
# or
git checkout -b fix/cart-total-calculation
```

Branch naming prefixes:
* `feat/` for new features
* `fix/` for bug fixes
* `docs/` for documentation changes
* `refactor/` for code refactoring
* `perf/` for performance enhancements
* `chore/` for tooling and maintenance updates

### 3. Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Coding Standards

* **TypeScript Strictness:** Maintain type safety. Avoid using `any` where explicit interfaces or generic types can be defined.
* **Component Design:** Keep components modular and single-responsibility. Extract reusable UI elements into `src/components/common/`.
* **Styling:** Use Tailwind CSS utility classes adhering to existing design tokens in `src/index.css`.
* **State Management:** Place global app state in dedicated React contexts (`AuthContext`, `CartContext`). Keep transient state local to the component using hooks.
* **Code Formatting & Linting:** Run the linter and ensure zero warnings or errors prior to committing:
  ```bash
  npm run lint
  ```

---

## Commit Guidelines

We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>
```

Examples:
* `feat(cart): implement coupon code discount calculation`
* `fix(storefront): resolve hero image aspect ratio on mobile devices`
* `docs(readme): add environment variables table`
* `refactor(api): streamline axios request interceptors`

---

## Submitting a Pull Request

Before opening a pull request, verify that:
1. The project compiles without TypeScript errors:
   ```bash
   npm run build
   ```
2. Lint checks pass cleanly:
   ```bash
   npm run lint
   ```
3. Your branch is rebased on the latest `main` branch.
4. Your pull request description clearly explains:
   * The purpose of the changes.
   * Any related issues (e.g., `Closes #42`).
   * Steps to test the changes locally.
   * Screenshots for UI additions or modifications.

---

## Reporting Issues

* **Bug Reports:** Open an issue on GitHub detailing your environment, steps to reproduce, expected behavior, and actual behavior.
* **Feature Requests:** Open a discussion or issue explaining the use case, suggested implementation, and potential alternatives.
