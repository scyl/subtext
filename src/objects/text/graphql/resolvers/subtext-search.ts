import { SubtextSearchResult } from "objects/text/types";

import { subtestSearch } from "objects/text/data";

export function resolver():SubtextSearchResult {
  return subtestSearch();
}
