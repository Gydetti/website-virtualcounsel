const transformer = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Add import of DEFAULT_PLACEHOLDER_IMAGE if not present
  const hasConstantsImport =
    root
      .find(j.ImportDeclaration, {
        source: { value: '@/lib/constants' },
      })
      .size() > 0;

  if (!hasConstantsImport) {
    const firstImport = root.find(j.ImportDeclaration).at(0);
    if (firstImport.size()) {
      firstImport.insertBefore(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('DEFAULT_PLACEHOLDER_IMAGE'))],
          j.literal('@/lib/constants')
        )
      );
    }
  } else {
    // Ensure DEFAULT_PLACEHOLDER_IMAGE is imported
    const importDecls = root.find(j.ImportDeclaration, { source: { value: '@/lib/constants' } });
    const hasSpecifier =
      importDecls
        .find(j.ImportSpecifier, { imported: { name: 'DEFAULT_PLACEHOLDER_IMAGE' } })
        .size() > 0;
    if (!hasSpecifier) {
      const importPaths = importDecls.paths();
      for (const path of importPaths) {
        path.node.specifiers.push(j.importSpecifier(j.identifier('DEFAULT_PLACEHOLDER_IMAGE')));
      }
    }
  }

  // Replace literal placeholder.svg references
  root
    .find(j.Literal, { value: '/placeholder.svg' })
    .replaceWith(j.identifier('DEFAULT_PLACEHOLDER_IMAGE'));
  root
    .find(j.Literal, { value: '/images/placeholders/placeholder.svg' })
    .replaceWith(j.identifier('DEFAULT_PLACEHOLDER_IMAGE'));

  // Handle common query-param variants e.g. '/placeholder.svg?width=..'
  root
    .find(
      j.Literal,
      lit => typeof lit.value === 'string' && lit.value.startsWith('/placeholder.svg?')
    )
    .replaceWith(j.identifier('DEFAULT_PLACEHOLDER_IMAGE'));

  return root.toSource({ quote: 'single' });
};

module.exports = transformer;
