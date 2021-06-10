/**
 * Better `object` that solves property accessibility issues.
 *
 * ```typescript
 * const O1: object = { name: "Bond" };
 * O1.name = "James Bond"; // 😠  Property 'name' does not exist on type 'object'.(2339)
 *
 * const O2: PlainObject = { name: "Bond" };
 * O2.name = "James Bond"; // 😎  No problem!
 * ```
 */
export type PlainObject = Record<string | number | symbol, any>;
