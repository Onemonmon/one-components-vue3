export const isObject = (target: any) =>
  typeof target === "object" && target !== null;

export const isArray = (target: any) => Array.isArray(target);

export const isFunction = (target: any) => typeof target === "function";

export const isNumber = (target: any) => typeof target === "number";

export const isString = (target: any) => typeof target === "string";

export const EMPTY_OBJ = {};

export const hasOwn = (target: object, key: string) =>
  Object.prototype.hasOwnProperty.call(target, key);

export const extend = Object.assign;
