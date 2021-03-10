import { version } from "objects/api/data";

export function resolver():string {
  return version();
}
