import { SubtextSearchResult } from "objects/text/types";

import { subtestSearch } from "objects/text/data";

export async function resolver(): Promise<SubtextSearchResult> {
  return subtestSearch();
}
