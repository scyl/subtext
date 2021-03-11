import { fetchRetry } from "utils";
import { SubtextSearchResult } from "objects/text/types";

export async function subtestSearch(): Promise<SubtextSearchResult> {
  const { text }: { text: string } = await fetchRetry("https://join.reckon.com/test2/textToSearch");

  return {
    text,
    subtexts: [],
    results: [],
  };
}
