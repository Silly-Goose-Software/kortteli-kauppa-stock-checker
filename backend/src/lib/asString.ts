import { Guard } from "./guard";

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};
const asString = (value: unknown, context: string): string => {
  Guard.againstNullOrUndefined(value, context);
  if (isString(value)) {
    return value;
  }
  // TODO: Needs a Parsing Error
  throw new Error(`Failed to parse '${value}' as String`);
};

export { asString };