import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 1, 
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app',
    trace: 'on-first-retry',      
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 800 },
    headless: true,               
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
