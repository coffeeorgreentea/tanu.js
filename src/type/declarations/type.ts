import * as ts from "typescript";

import { TypeDefinition } from "..";
import { setLazy } from "../../utils";
import { toTypeNode } from "../utils";

const constructType = (name: string, definition: TypeDefinition) => {
	return ts.factory.createTypeAliasDeclaration(
		undefined,
		[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		name,
		undefined,
		toTypeNode(definition)
	);
};

/**
 * Create an explicit type.
 *
 * @param name The type name.
 * @param definition The type definition.
 */
export function type(
	name: string,
	definition: TypeDefinition | (() => TypeDefinition)
): ts.TypeAliasDeclaration {
	if (typeof definition !== "function") return constructType(name, definition);
	return setLazy(constructType(name, {}), () => constructType(name, definition()));
}
