/**
 * Custom ESLint rules for GMG Template Website
 * Enforces component consistency and theme system usage
 */

module.exports = {
  'no-hardcoded-buttons': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Prevent hardcoded button styling, enforce Button component usage',
        category: 'Best Practices',
        recommended: true,
      },
      fixable: 'code',
      schema: [],
      messages: {
        hardcodedButton:
          'Use the Button component instead of hardcoded button styling. Found pattern: "{{pattern}}"',
        hardcodedBorderRadius: 'Use theme border radius system instead of hardcoded "{{class}}"',
        incorrectHoverColor:
          'Use correct hover color syntax "{{correct}}" instead of "{{incorrect}}"',
      },
    },
    create(context) {
      return {
        JSXElement(node) {
          // Check for Link elements with button-like classes
          if (node.openingElement.name.name === 'Link') {
            const classNameAttr = node.openingElement.attributes.find(
              attr => attr.name?.name === 'className'
            );

            if (classNameAttr?.value?.value) {
              const className = classNameAttr.value.value;

              // Check for button-like patterns
              const buttonPatterns = [
                /inline-block.*px-\d+.*py-\d+/,
                /bg-primary.*text-white/,
                /px-\d+.*py-\d+.*bg-/,
                /hover:bg-\w+\d+(?!\d)/, // catches hover:bg-primary90 but not hover:bg-primary/90
              ];

              const hardcodedBorderRadius = /rounded-(?:sm|md|lg|xl|2xl|3xl|full)/;
              const incorrectHoverSyntax = /hover:bg-(\w+)(\d+)(?!\d)/;

              for (const pattern of buttonPatterns) {
                if (pattern.test(className)) {
                  context.report({
                    node,
                    messageId: 'hardcodedButton',
                    data: { pattern: pattern.toString() },
                  });
                }
              }

              if (hardcodedBorderRadius.test(className)) {
                const match = className.match(hardcodedBorderRadius);
                context.report({
                  node,
                  messageId: 'hardcodedBorderRadius',
                  data: { class: match[0] },
                });
              }

              if (incorrectHoverSyntax.test(className)) {
                const match = className.match(incorrectHoverSyntax);
                const incorrect = match[0];
                const correct = `hover:bg-${match[1]}/${match[2]}`;
                context.report({
                  node,
                  messageId: 'incorrectHoverColor',
                  data: { incorrect, correct },
                });
              }
            }
          }

          // Check for button elements with hardcoded styling
          if (node.openingElement.name.name === 'button') {
            const classNameAttr = node.openingElement.attributes.find(
              attr => attr.name?.name === 'className'
            );

            if (classNameAttr?.value?.value) {
              const className = classNameAttr.value.value;

              // Check for extensive styling that should use Button component
              const complexButtonPattern = /(?=.*bg-)(?=.*text-)(?=.*p[xy]?-\d+)/;

              if (complexButtonPattern.test(className)) {
                context.report({
                  node,
                  messageId: 'hardcodedButton',
                  data: { pattern: 'complex button styling' },
                });
              }
            }
          }
        },
      };
    },
  },
};
