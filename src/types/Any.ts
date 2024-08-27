type AnyValue = string | number | boolean | null | Any | AnyArray;
interface Any {
  [key: string]: AnyValue;
}
interface AnyArray extends Array<AnyValue> {}
