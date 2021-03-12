import { FormattedSubtextSearchResult } from "objects/text/types";

import { subtextSearch } from "objects/text/data";

export async function resolver(): Promise<FormattedSubtextSearchResult> {
  const searchResult = await subtextSearch();

  // Convert the search result to the expected format
  return {
    text: searchResult.text,
    subtexts: searchResult.subtexts,
    results: searchResult.results.map((subtextResult) => ({
      subtext: subtextResult.subtext,
      result: subtextResult.result.length > 0
        ? subtextResult.result.map((index) => index + 1).join(", ")
        : "<No Output>",
    })),
  };
}
