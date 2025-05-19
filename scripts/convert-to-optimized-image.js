/**
 * Codemod: Replace Next.js Image with OptimizedImage wrapper and blurMap placeholders.
 */
module.exports = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Remove import from next/image and add imports for OptimizedImage and blurMap
  const imageImport = root.find(j.ImportDeclaration, { source: { value: 'next/image' } });
  if (imageImport.size() > 0) {
    imageImport.remove();
    const firstImport = root.find(j.ImportDeclaration).at(0);
    if (firstImport.size()) {
      firstImport.insertBefore(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('OptimizedImage'))],
          j.literal('@/components/ui/optimized-image')
        )
      );
      firstImport.insertBefore(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('blurMap'))],
          j.literal('/public/images/blurDataURL.json')
        )
      );
    }
  }

  // Replace <Image> tags with <OptimizedImage> and add blurDataURL
  const images = root
    .find(j.JSXElement, {
      openingElement: { name: { type: 'JSXIdentifier', name: 'Image' } },
    })
    .paths();

  for (const path of images) {
    const opening = path.node.openingElement;
    // Rename tag
    opening.name.name = 'OptimizedImage';

    // Add placeholder
    if (!opening.attributes.some(attr => attr.name && attr.name.name === 'placeholder')) {
      opening.attributes.push(j.jsxAttribute(j.jsxIdentifier('placeholder'), j.literal('blur')));
    }

    const srcAttr = opening.attributes.find(attr => attr.name && attr.name.name === 'src');
    let srcExpr = j.literal('');
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (srcAttr && srcAttr.value) {
      if (srcAttr.value.type === 'Literal' || srcAttr.value.type === 'StringLiteral') {
        srcExpr = j.literal(srcAttr.value.value);
      } else if (srcAttr.value.type === 'JSXExpressionContainer') {
        srcExpr = srcAttr.value.expression;
      }
    }

    // Add blurDataURL attribute
    opening.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier('blurDataURL'),
        j.jsxExpressionContainer(j.memberExpression(j.identifier('blurMap'), srcExpr, true))
      )
    );
  }

  return root.toSource({ quote: 'single' });
};
