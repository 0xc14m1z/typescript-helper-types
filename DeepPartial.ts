import { PlainObject } from "./PlainObject";

/**
 * Constructs a type with all the properties of `Type` set to optional at all
 * levels of depth. It acts as a recursive `Partial<Type>` basically.
 *
 * ```typescript
 * interface Person {
 *   firstName: string,
 *   lastName: string,
 *   contacts: {
 *     primary: string,
 *     secondary: string
 *   }
 * }
 *
 * DeepPartial<Person> === {
 *   firstName?: string,
 *   lastName?: string,
 *   contacts?: {
 *     primary?: string,
 *     secondary?: string
 *   }
 * }
 * ```
 */
export type DeepPartial<Type extends PlainObject> = {
  [Property in keyof Type]?: Type[Property] extends PlainObject
    ? DeepPartial<Type[Property]>
    : Type[Property];
};
