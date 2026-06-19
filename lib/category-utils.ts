/** posts.category (metin) ile categories.name eşleştirmesi için normalize. */
export function normalizeCategoryKey(name: string): string {
  return name.trim().toLowerCase();
}

export function buildCategorySlugLookup(
  categories: readonly { name: string; slug: string }[]
): Map<string, string> {
  const map = new Map<string, string>();
  for (const c of categories) {
    map.set(normalizeCategoryKey(c.name), c.slug);
  }
  return map;
}

export function resolveCategorySlug(
  categoryName: string | null | undefined,
  lookup: Map<string, string>
): string | undefined {
  if (!categoryName?.trim()) return undefined;
  return lookup.get(normalizeCategoryKey(categoryName));
}
