export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const collection = root.find(j.JSXAttribute, { name: { name: 'className' } });
  for (const path of collection.paths()) {
    const val = path.node.value;
    if (!val) continue;
    let classString;
    if (val.type === 'Literal') {
      classString = val.value;
    } else if (val.type === 'JSXExpressionContainer' && val.expression.type === 'StringLiteral') {
      classString = val.expression.value;
    } else {
      continue;
    }
    const classes = classString.split(/\s+/).filter(c => !/^bg-/.test(c));
    const newClassString = classes.join(' ');
    if (val.type === 'Literal') {
      path.node.value.value = newClassString;
    } else if (val.type === 'JSXExpressionContainer' && val.expression.type === 'StringLiteral') {
      val.expression.value = newClassString;
    }
  }

  return root.toSource();
}
