// GlobalComponents for Volar
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ProTable: typeof import("./index")["ProTable"];
    ProQueryFilter: typeof import("./index")["ProQueryFilter"];
    ProInput: typeof import("./index")["ProInput"];
    ProRadio: typeof import("./index")["ProRadio"];
    ProCheckbox: typeof import("./index")["ProCheckbox"];
    ProSelect: typeof import("./index")["ProSelect"];
    ProText: typeof import("./index")["ProText"];
  }
}

export {};
