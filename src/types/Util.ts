const onlyType = <T>(x: T | false | undefined | null | "" | 0): x is T => !!x;

export {
  onlyType,
};
