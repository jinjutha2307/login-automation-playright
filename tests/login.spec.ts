import { test, expect } from '@playwright/test';
import { openBoard, expectTaskWithTags } from '../utils/selectors';
import cases from '../data/board-cases.json';



type BoardCase = {
  name: string;
  board: string;
  column: string;
  taskTitle: string;
  tags: string[];
};

async function loginDemoApp(page: any, email: string, password: string) {
  // 1) Navigate to the login page
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // 2) Wait for the login form to be visible
  await page.waitForSelector('form', { state: 'visible', timeout: 10000 });

  // 3) Fill email / username
  const emailInput = page
    .getByPlaceholder(/email|username/i)
    .or(page.getByLabel(/email|username/i))
    .or(page.locator('input[type="text"], input[type="email"]').first());
  await emailInput.fill(email);

  // 4) Fill password
  const pwdInput = page
    .getByPlaceholder(/password/i)
    .or(page.getByLabel(/password/i))
    .or(page.locator('input[type="password"]').first());
  await pwdInput.fill(password);

  // 5) Submit
  const submit = page
    .getByRole('button', { name: /log\s*in|sign\s*in|submit/i })
    .or(page.locator('button[type="submit"]').first());
  await submit.click();

  // 6) Stabilize post-login navigation
  await page.waitForLoadState('networkidle');
}

test.describe('Login + Board Assertions', () => {
  (cases as BoardCase[]).forEach((c) => {
    test(c.name, async ({ page }) => {
      
      page.on('console', (msg) =>
        console.log('[BROWSER]', msg.type(), msg.text())
      );
      page.on('pageerror', (err) =>
        console.log('[PAGEERROR]', err.message)
      );

      // --- Login once per scenario ---
      await test.step('Login to Demo App', async () => {
        await loginDemoApp(page, 'admin', 'password123');
        await expect(page).toHaveURL(/netlify\.app/i);
      });

      // --- Navigate to board and verify task/tags ---
      await test.step(`Open board: ${c.board}`, async () => {
        await openBoard(page, c.board);
      });

      await test.step(
        `Verify "${c.taskTitle}" in "${c.column}" with tags [${c.tags.join(
          ', '
        )}]`,
        async () => {
          await expectTaskWithTags(page, c.column, c.taskTitle, c.tags);
        }
      );
    });
  });
});
