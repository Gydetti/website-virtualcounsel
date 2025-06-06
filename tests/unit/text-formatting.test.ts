import { describe, expect, test } from 'vitest';

import { hasMarkdownFormatting, parseMarkdownParts } from '@/lib/utils/text-formatting';

describe('Text Formatting Utilities', () => {
  describe('hasMarkdownFormatting', () => {
    test('detects markdown formatting', () => {
      expect(hasMarkdownFormatting('This has **bold** text')).toBe(true);
      expect(hasMarkdownFormatting('**start bold** and normal text')).toBe(true);
      expect(hasMarkdownFormatting('Normal text **bold** and **more bold**')).toBe(true);
    });

    test('returns false for plain text', () => {
      expect(hasMarkdownFormatting('This is plain text')).toBe(false);
      expect(hasMarkdownFormatting('No formatting here')).toBe(false);
      expect(hasMarkdownFormatting('')).toBe(false);
    });

    test('handles edge cases', () => {
      expect(hasMarkdownFormatting('Single * asterisk')).toBe(false);
      expect(hasMarkdownFormatting('**incomplete bold')).toBe(true);
      expect(hasMarkdownFormatting('incomplete bold**')).toBe(true);
    });
  });

  describe('parseMarkdownParts', () => {
    test('parses simple bold text', () => {
      const result = parseMarkdownParts('Hello **world**!');
      expect(result).toEqual([
        { text: 'Hello ', isBold: false },
        { text: 'world', isBold: true },
        { text: '!', isBold: false },
      ]);
    });

    test('parses multiple bold sections', () => {
      const result = parseMarkdownParts('Text with **first bold** and **second bold** parts');
      expect(result).toEqual([
        { text: 'Text with ', isBold: false },
        { text: 'first bold', isBold: true },
        { text: ' and ', isBold: false },
        { text: 'second bold', isBold: true },
        { text: ' parts', isBold: false },
      ]);
    });

    test('handles plain text without formatting', () => {
      const result = parseMarkdownParts('Just plain text here');
      expect(result).toEqual([{ text: 'Just plain text here', isBold: false }]);
    });

    test('handles text starting with bold', () => {
      const result = parseMarkdownParts('**Bold start** followed by normal text');
      expect(result).toEqual([
        { text: 'Bold start', isBold: true },
        { text: ' followed by normal text', isBold: false },
      ]);
    });

    test('handles text ending with bold', () => {
      const result = parseMarkdownParts('Normal text followed by **bold end**');
      expect(result).toEqual([
        { text: 'Normal text followed by ', isBold: false },
        { text: 'bold end', isBold: true },
      ]);
    });

    test('handles VirtualCounsel about page content example', () => {
      const text =
        'Ik ben Maarten van Beek, oprichter van VirtualCounsel. Met meer dan **10 jaar ervaring** in het adviseren van **ICT- en softwarebedrijven** begrijp ik de unieke uitdagingen waar tech-ondernemers tegenaan lopen.';
      const result = parseMarkdownParts(text);

      expect(result).toEqual([
        {
          text: 'Ik ben Maarten van Beek, oprichter van VirtualCounsel. Met meer dan ',
          isBold: false,
        },
        { text: '10 jaar ervaring', isBold: true },
        { text: ' in het adviseren van ', isBold: false },
        { text: 'ICT- en softwarebedrijven', isBold: true },
        {
          text: ' begrijp ik de unieke uitdagingen waar tech-ondernemers tegenaan lopen.',
          isBold: false,
        },
      ]);
    });

    test('handles empty strings and edge cases', () => {
      expect(parseMarkdownParts('')).toEqual([{ text: '', isBold: false }]);
      expect(parseMarkdownParts('**')).toEqual([{ text: '**', isBold: false }]);
      expect(parseMarkdownParts('****')).toEqual([{ text: '', isBold: true }]);
    });
  });
});
