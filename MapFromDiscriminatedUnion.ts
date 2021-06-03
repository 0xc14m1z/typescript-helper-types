/**
 * These two types help extracting from a discriminated union an object type
 * whose keys are the the discriminants and the values the cases.
 *
 * For example:
 *   type DU =
 *     | { type: "A", firstProperty: number }
 *     | { type: "B", secondProperty: string }
 *
 *   type MappedDU = MapFromDiscriminatedUnion<DU, "type">
 *
 *   resolves to:
 *
 *   type MappedDU = {
 *     A: { type: "A", firstProperty: number }
 *     B: { type: "B", secondProperty: string }
 *   }
 *
 */
type ExtractCaseFromUnion<
  DiscriminatedUnion extends Record<Discriminant, string>,
  Discriminant extends keyof DiscriminatedUnion,
  Case extends DiscriminatedUnion[Discriminant]
> = DiscriminatedUnion extends Record<Discriminant, Case>
  ? DiscriminatedUnion
  : never;

export type MapFromDiscriminatedUnion<
  DiscriminatedUnion extends Record<Discriminant, string>,
  Discriminant extends keyof DiscriminatedUnion
> = {
  [Case in DiscriminatedUnion[Discriminant]]: ExtractCaseFromUnion<
    DiscriminatedUnion,
    Discriminant,
    Case
  >;
};
