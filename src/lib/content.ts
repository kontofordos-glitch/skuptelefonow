import { prisma } from "@/lib/prisma";

export async function getContentBlocks<T extends Record<string, string>>(fallbacks: T): Promise<T> {
  try {
    const blocks = await prisma.contentBlock.findMany({
      where: { key: { in: Object.keys(fallbacks) } }
    });
    const values = { ...fallbacks };

    for (const block of blocks) {
      if (block.key in values) {
        values[block.key as keyof T] = block.value as T[keyof T];
      }
    }

    return values;
  } catch {
    return fallbacks;
  }
}
