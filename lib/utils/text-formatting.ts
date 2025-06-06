/**
 * Utility to check if text contains markdown formatting
 * @param text - Text to check
 * @returns boolean indicating if formatting is present
 */
export function hasMarkdownFormatting(text: string): boolean {
  return typeof text === 'string' && text.includes('**');
}

/**
 * Parse markdown text to create parts array for rendering
 * @param text - Text with markdown syntax
 * @returns Array of parts with formatting metadata
 */
export function parseMarkdownParts(text: string): Array<{ text: string; isBold: boolean }> {
  if (!hasMarkdownFormatting(text)) {
    return [{ text, isBold: false }];
  }

  const parts: Array<{ text: string; isBold: boolean }> = [];
  const segments = text.split(/(\*\*.*?\*\*)/g);

  for (const segment of segments) {
    if (segment.startsWith('**') && segment.endsWith('**') && segment.length > 4) {
      // Valid bold formatting: must be at least 4 characters (**X**)
      const boldText = segment.slice(2, -2);
      parts.push({ text: boldText, isBold: true });
    } else if (segment === '****') {
      // Special case for empty bold
      parts.push({ text: '', isBold: true });
    } else if (segment) {
      // Regular text or incomplete markdown
      parts.push({ text: segment, isBold: false });
    }
  }

  return parts;
}
