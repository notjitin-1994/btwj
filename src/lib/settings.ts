import { db } from "@/lib/db";

/**
 * Key-value settings store backed by the Setting table.
 * Used for storing the Instagram long-lived token, refresh timestamp, etc.
 */
export async function getSetting(key: string): Promise<string | null> {
  const row = await db.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
