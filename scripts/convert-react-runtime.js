#!/usr/bin/env node

module.exports.parser = "tsx";

/**
 * jscodeshift transform to migrate React code to SWC automatic JSX runtime:
 * 1. Removes default and namespace React imports.
 * 2. Finds React.<API> usages and injects corresponding named imports.
 * 3. Replaces React.<API> with direct API calls (e.g., forwardRef, useState).
 */
module.exports = function transformer(fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	// Remove default and namespace React imports
	const reactImportPaths = root
		.find(j.ImportDeclaration, { source: { value: "react" } })
		.paths();
	for (const path of reactImportPaths) {
		const specs = path.node.specifiers;
		const namedSpecs = specs.filter((s) => s.type === "ImportSpecifier");
		if (namedSpecs.length > 0) {
			path.node.specifiers = namedSpecs;
		} else {
			j(path).remove();
		}
	}

	// Collect used React APIs
	const used = new Set();
	const memberPaths = root
		.find(j.MemberExpression, {
			object: { name: "React" },
			property: (p) => p.type === "Identifier",
		})
		.paths();
	for (const path of memberPaths) {
		const name = path.node.property.name;
		used.add(name);
		// Replace React.name with name
		j(path).replaceWith(j.identifier(name));
	}

	if (used.size > 0) {
		const importDecls = root.find(j.ImportDeclaration, {
			source: { value: "react" },
		});
		const specifiersToAdd = Array.from(used)
			.sort()
			.map((name) => j.importSpecifier(j.identifier(name)));
		if (importDecls.size() > 0) {
			const importPaths = importDecls.paths();
			for (const path of importPaths) {
				const existing = path.node.specifiers
					.filter((s) => s.type === "ImportSpecifier")
					.map((s) => s.imported.name);
				for (const spec of specifiersToAdd) {
					if (!existing.includes(spec.imported.name)) {
						path.node.specifiers.push(spec);
					}
				}
			}
		} else {
			// Insert new named import
			const newImport = j.importDeclaration(
				specifiersToAdd,
				j.literal("react"),
			);
			root.get().node.program.body.unshift(newImport);
		}
	}

	return root.toSource({ quote: "single" });
};
