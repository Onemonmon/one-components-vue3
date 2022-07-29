// GlobalComponents for Volar
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ProTable: typeof import("@components/index")["ProTable"];
    ProQueryFilter: typeof import("@components/index")["ProQueryFilter"];
    ProInput: typeof import("@components/index")["ProInput"];
    ProRadio: typeof import("@components/index")["ProRadio"];
    ProCheckbox: typeof import("@components/index")["ProCheckbox"];
    ProSelect: typeof import("@components/index")["ProSelect"];
    ProText: typeof import("@components/index")["ProText"];
  }
}

export {};
