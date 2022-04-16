/**
 * Returns the element of a union `Union` joined by a property `Property` with
 * value `Value` or never.
 *
 * ```typescript
 * type FiscalIds =
 *   | { country: "usa", socialSecurityNumber: string }
 *   | { country: "italy", fiscalCode: string }
 *   | { country: "switzerland", swissId: string }
 *
 * FindInUnion<FiscalIds, "country", "usa"> === {
 *   country: "usa",
 *   socialSecurityNumber: string
 * }
 * ```
 */
export type FindInUnion<
  Union,
  Property extends keyof Union,
  Value extends Union[Property]
> = Union extends { [property in Property]: Value } ? Union : never;
