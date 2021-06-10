/**
 * Constructs a type with all the properties of `Type` set to `never`
 *
 * ```typescript
 * type Person = { firstName: string, lastName: string }
 * Never<Person> === { firstName: never, lastName: never }
 * ```
 */
export type Never<Type> = Record<keyof Type, never>;
