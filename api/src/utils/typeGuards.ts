import { Nil } from './types';
import { createTypeGuard } from './validator';

export const isNil = createTypeGuard<Nil>((v) => v === null || v === undefined);
export const isString = createTypeGuard<string>(
  (v) => !isNil(v) && typeof v === 'string'
);
export const isNumber = createTypeGuard<number>(
  (v) => !isNil(v) && typeof v === 'number'
);
const NUMBER_REGEX = /^\d+(\.\d+)?$/;
export const isNumberParsable = createTypeGuard<string>(
  (v) => isString(v) && v.match(NUMBER_REGEX) !== null
);
export const isPlainObject = createTypeGuard<Record<string, unknown>>(
  (v) => !isNil(v) && Object.getPrototypeOf(v)?.constructor === Object
);
