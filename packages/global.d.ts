// GlobalComponents for Volar
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ProInput: typeof import("./index")["ProInput"];
    ProRadio: typeof import("./index")["ProRadio"];
    ProSelect: typeof import("./index")["ProSelect"];
    ProText: typeof import("./index")["ProText"];
  }
}

export {};
