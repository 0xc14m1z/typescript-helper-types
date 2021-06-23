/**
 * Represents a value of type `Type` or a function that returns `Type` given arguments of type `WithArgs`.
 *
 * ```typescript
 * type RectangleArea = FactoryOf<number, [base: number, height: number]>;
 *
 * const A1: RectangleArea = 123; // 😎  No problem!
 * const A2: RectangleArea = (base: number, height: number) => base * height; // 😎  No problem!
 *
 * const A3: RectangleArea = (base: number, height: string) => base + height;
 * // 😠
 * // Type '(base: number, height: string) => number' is not assignable to type 'FactoryOf<number, [base: number, height: number]>'.
 * //   Type '(base: number, height: string) => number' is not assignable to type '(base: number, height: number) => number'.
 * //     Types of parameters 'height' and 'height' are incompatible.
 * //       Type 'number' is not assignable to type 'string'.(2322)
 * ```
 */

type FactoryOf<Type, WithArgs extends any[] = []> =
  | Type
  | ((...args: WithArgs) => Type);
