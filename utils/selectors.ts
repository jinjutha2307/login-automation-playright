import { Page, Locator, expect } from "@playwright/test";

export async function openBoard(page: Page, boardName: string) {
  const name = exactTextRegex(boardName);

  const board = page
    .getByRole("link", { name })
    .or(page.getByRole("button", { name }))
    .or(page.getByText(name).first());

  await expect(board, `Board "${boardName}" not visible`).toBeVisible({
    timeout: 10_000,
  });
  await board.click();

  await page.waitForLoadState("networkidle");
}

export function columnRegion(page: Page, columnName: string): Locator {
  const heading = page.getByRole("heading", {
    name: new RegExp(`^${escapeReg(columnName)}(\\s*\\(.*\\))?$`, "i"),
  });

  const region = heading.locator("xpath=ancestor::div[1]");

  return region;
}

export function taskCardIn(region: Locator, title: RegExp): Locator {
  // Get the cards container
  const cards = region.locator("div.flex.flex-col.gap-3");

  // Find the card with the specified title
  const cardTitle = cards.getByRole("heading", { name: title });
  const card = cardTitle.locator("xpath=ancestor::div[1]");
  return card;
}

export async function expectTagsIn(
  card: Locator,
  tags: string[],
) {
  for (const tag of tags) {
    const name = exactTextRegex(tag);
    const tagLoc = card
      .getByRole("link", { name })
      .or(card.getByRole("button", { name }))
      .or(card.getByText(name).first());

    await expect(tagLoc, `Tag "${tag}" not visible on card`).toBeVisible({
      timeout: 8_000,
    });
  }
}

export async function expectTaskWithTags(
  page: Page,
  columnName: string,
  taskTitle: string,
  tags: string[]
) {
  const region = columnRegion(page, columnName);
  
  await expect(region, `Column "${columnName}" not found`).toBeVisible({
    timeout: 10_000,
  });

  await page.waitForSelector(
    "div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200",
    { state: "visible" }
  );

  const title = exactTextRegex(taskTitle);

  const card = taskCardIn(region, title);

  await expect(card, `Card "${taskTitle}" not visible`).toBeVisible();

  await expectTagsIn(card, tags);
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** exact, case-insensitive text match (no leading/trailing surprises) */
function exactTextRegex(text: string): RegExp {
  return new RegExp(`^\\s*${escapeReg(text)}\\s*$`, "i");
}
