const onlyType = <T>(x: T | false | undefined | null | "" | 0): x is T => !!x;
type KeysOfUnion<T> = T extends T ? keyof T: never;

export {
  onlyType,
  type KeysOfUnion,
};
