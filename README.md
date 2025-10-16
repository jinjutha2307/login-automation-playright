# 🧪 Login Automation Suite (Playwright + TypeScript)

Automated end-to-end tests for verifying login and task board functionality using [Playwright](https://playwright.dev/).  
This suite demonstrates a scalable, data-driven approach for UI automation — each test reads its parameters from JSON, minimizing code duplication and improving maintainability.

---

## 🚀 Features

- **Playwright + TypeScript** setup with clean project structure  
- **Data-driven tests** powered by JSON input  
- **Reusable page objects and selectors** for modular design  
- **Cross-browser support** (Chromium, Firefox)  
- HTML reports, traces, and screenshots for easy debugging  

---

## 🧩 Project Structure

- playwright.config.*  — Playwright configuration

- tests/ login.spec.ts — Main test suite

- utils/ selectors.ts — Locator & verification helpers

- data/ board-cases.json — Test case definitions

- .gitignore

---

## ⚙️ Setup

1. **Clone the repository**

   ```bash 
   git clone https://github.com/jinjutha2307/login-automation-playright.git
   cd login-automation-playright

2. **Install dependencies**
   ```bash 
   npm install
      
   ```
3. **Install Playwright browsers**
   ```bash 
   npx playwright install --with-deps

   ```

---

## ▶️ Run Tests

Run all tests (Chromium + Firefox):

```bash
npx playwright test

```
Run in a specific browser:

```bash
npx playwright test --project=chromium

```

Run headed mode (watch it in the browser):

```bash
npx playwright test --headed
```

View last HTML report:

```bash
npx playwright show-report

```

