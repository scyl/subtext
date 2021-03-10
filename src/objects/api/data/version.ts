import pkg from "../../../../package.json";

export function version(): string {
  return pkg.version;
}
