import type { Data, ValueType } from "./type";

export const isObject = (target: any) =>
  typeof target === "object" && target !== null;

export const isArray = (target: any) => Array.isArray(target);

export const isFunction = (target: any) => typeof target === "function";

export const isNumber = (target: any) => typeof target === "number";

export const isString = (target: any) => typeof target === "string";

export const hasOwn = (target: object, key: string) =>
  Object.prototype.hasOwnProperty.call(target, key);

// 获取特定长度的随机数字作为key
export const getRandomKey = (length = 6) =>
  `${Math.floor((Math.random() + 1) * Math.pow(10, length))}`;

const componentsMap: Record<ValueType, string> = {
  text: "ProInput",
  select: "ProSelect",
  radio: "ProRadio",
  checkbox: "ProCheckbox",
  datePicker: "ProDatePicker",
};

// 根据valueType的值返回对应组件
export const getComponentByType = (type: ValueType = "text") =>
  componentsMap[type];

// 根据prop获取value 如：{ info: { age: 18 } } prop: info.age => 18
export const getValueByComplexKey = (
  rawValue: Data,
  key: string,
  splitSign: string = "."
) => {
  const keys = key.split(splitSign);
  const keysLength = keys.length;
  if (keysLength > 1) {
    let value: any = rawValue;
    for (let i = 0; i < keysLength; i++) {
      if (!hasOwn(value, keys[i])) {
        return undefined;
      }
      value = value[keys[i]];
    }
    return value;
  }
  return rawValue[key];
};

export const setValueByComplexKey = (
  rawValue: Data,
  key: string,
  value: any,
  splitSign: string = "."
) => {
  const keys = key.split(splitSign);
  const keysLength = keys.length;
  if (keysLength > 1) {
    let i;
    for (i = 0; i < keysLength - 1; i++) {
      rawValue = rawValue[keys[i]];
    }
    rawValue[keys[i]] = value;
  } else {
    rawValue[key] = value;
  }
  return true;
};

export const extend = Object.assign;

export const EMPTY_OBJ = {};
