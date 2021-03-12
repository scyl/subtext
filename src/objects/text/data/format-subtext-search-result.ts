import { FormattedSubtextSearchResult, SubtextSearchResult } from "objects/text/types";

// Convert the search result to the expected format
export function formatSubtextSearchResult(
  searchResult: SubtextSearchResult,
): FormattedSubtextSearchResult {
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
