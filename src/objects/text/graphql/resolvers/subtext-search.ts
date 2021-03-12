import { FormattedSubtextSearchResult } from "objects/text/types";

import { subtextSearch, formatSubtextSearchResult } from "objects/text/data";

export async function subtextSearchResolver(): Promise<FormattedSubtextSearchResult> {
  const searchResult = await subtextSearch();

  return formatSubtextSearchResult(searchResult);
}
