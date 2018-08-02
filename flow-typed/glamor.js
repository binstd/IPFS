declare module 'glamor' {
  declare module.exports: {
    css: {
      global: (...params: any) => void,
    },
  };
}

declare module 'glamor/react' {
  declare module.exports: {
    createElement: any,
    dom: any,
    vars: any,
    makeTheme: any,
    propMerge: Function,
  };
}

declare module 'glamor/reset' {
  declare module.exports: any;
}
