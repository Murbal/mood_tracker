type Validator = (value: unknown) => boolean;
export type Assert<T> = (value: unknown) => asserts value is T;
export type TypeGuard<T> = (maybeType: unknown) => maybeType is T;

/**
 * creates a function to assert if provided value is of desired type
 *
 * @param typeGuard custom type guard to determine if value is of correct type
 */
export const createAssert =
  <T>(errorMessage: string, typeGuard: TypeGuard<T>) =>
  (value: unknown): asserts value is T => {
    if (!typeGuard(value)) {
      throw new Error(`AssertionError: ${errorMessage}`);
    }
  };
export const createTypeGuard =
  <T>(validator: Validator) =>
  (maybeOfType: unknown): maybeOfType is T => {
    return validator(maybeOfType);
  };
