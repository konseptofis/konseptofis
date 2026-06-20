/** Blog içeriği render öncesi: lazy img + tablo genişlik düzeltmesi. */
export function enhanceContentHtml(html: string): string {
  let result = html.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');
  result = fixTableWidths(result);
  result = wrapStandaloneTables(result);
  return result;
}

function fixTableWidths(html: string): string {
  return html.replace(/<table([^>]*)>/gi, (_match, attrs: string) => {
    const styleMatch = attrs.match(/\sstyle="([^"]*)"/i);
    if (styleMatch) {
      const cleaned = styleMatch[1]
        .replace(/\bwidth\s*:\s*[^;]+;?\s*/gi, "")
        .replace(/\bmin-width\s*:\s*[^;]+;?\s*/gi, "")
        .trim();
      const style = ["width: 100%", "table-layout: fixed", cleaned].filter(Boolean).join("; ");
      const nextAttrs = attrs.replace(/\sstyle="[^"]*"/i, ` style="${style}"`);
      return `<table${nextAttrs}>`;
    }
    return `<table${attrs} style="width: 100%; table-layout: fixed;">`;
  });
}

function wrapStandaloneTables(html: string): string {
  return html.replace(/<table[\s\S]*?<\/table>/gi, (match, offset, full) => {
    const before = full.slice(Math.max(0, offset - 120), offset);
    if (/<div class="(?:table-scroll|tableWrapper)[^"]*">\s*$/i.test(before)) {
      return match;
    }
    return `<div class="table-scroll">${match}</div>`;
  });
}
