import { Never } from "./Never";

/**
 * Constructs a type that strictly represents one or the other given types.
 *
 * The symbol `|` when used among two types is "mentally read" as "or", but it
 * isn't. It's name is Union, because it unites together the types that surround
 * it.
 *
 * ```
 * type Person = { firstName: string, lastName: string }
 * type Company = { legalEntityName: string }
 *
 * type LoosePersonOrCompany = Person | Company
 * ```
 *
 * In this example `LoosePersonOrCompany` is accepting as a valid value the sum
 * (hence, the union) of the `Person` and the `Company` types, not only one of them.
 * The following is perfectly valid assignment:
 *
 * ```typescript
 * const O1: LoosePersonOrCompany = {
 *   firstName: "James",
 *   lastName: "Bond",
 *   legalEntityName: "Queen"
 * }
 * ```
 *
 * With `Either<Person, Company>`, instead, it complains as it should.
 *
 * ```typescript
 * type StrictPersonOrCompany = Either<Person, Company>
 *
 * const O2: StrictPersonOrCompany = { firstName: "James", lastName: "Bond", legalEntityName: "Queen" }
 * // 😠  Type '{ firstName: string; lastName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.
 *
 * const O3: StrictPersonOrCompany = { firstName: "James", legalEntityName: "Queen" }
 * // 😠  Type '{ firstName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.
 *
 * const O4: StrictPersonOrCompany = { lastName: "Bond", legalEntityName: "Queen" }
 * // 😠  Type '{ lastName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.
 *
 * const O5: StrictPersonOrCompany = { firstName: "James", lastName: "Bond" }
 * // 😎  No problem!
 *
 * const O6: StrictPersonOrCompany = { legalEntityName: "Queen" }
 * // 😎  No problem!
 * ```
 */
export type Either<OneType, OtherType> =
  | (OneType & Never<Partial<Omit<OtherType, keyof OneType>>>)
  | (OtherType & Never<Partial<Omit<OneType, keyof OtherType>>>);
