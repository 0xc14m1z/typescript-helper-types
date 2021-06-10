import type { Nullable } from "./Nullable";

/**
 * Alias for `Type | null | undefined`.
 */
export type Optional<Type> = Nullable<Type> | undefined;
