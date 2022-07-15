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

export const getRandomNumber = (length = 6) =>
  Math.floor((Math.random() + 1) * Math.pow(10, length));
