// A jscodeshift codemod to add React import where missing
module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const source = fileInfo.source;
  // Only process JS/TS[X] files
  if (!/\.tsx?$/.test(fileInfo.path)) return null;

  // Skip if already has a value React import
  const root = j(source);
  const hasReactValueImport =
    root
      .find(j.ImportDeclaration, {
        source: { value: 'react' },
      })
      .filter(path => {
        // Check for default import specifier
        return path.node.specifiers.some(spec => spec.type === 'ImportDefaultSpecifier');
      })
      .size() > 0;
  if (hasReactValueImport) return null;

  // Only add import if file uses JSX or React namespace
  const usesJSX = /<\w+/.test(source);
  const usesReactNamespace = /React\./.test(source);
  if (!usesJSX && !usesReactNamespace) return null;

  // Prepend import React
  const importDecl = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier('React'))],
    j.literal('react')
  );
  root.get().node.program.body.unshift(importDecl);
  return root.toSource({ quote: 'double' });
};
