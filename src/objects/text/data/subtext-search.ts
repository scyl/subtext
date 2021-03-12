import { fetchRetry } from "utils";
import { SubtextSearchResult } from "objects/text/types";

// Do subtext search from text provided by Reckon
export async function subtextSearch(): Promise<SubtextSearchResult> {
  // Fetches the text to search from
  const { text }: { text: string } = await fetchRetry("https://join.reckon.com/test2/textToSearch");
  // The search is case insenitive, so we can convert it to all lower case
  const lowerText = text.toLowerCase();

  // Fetches the subtexts to search for
  const subtextsResult: { subTexts: Array<string> } = await fetchRetry("https://join.reckon.com/test2/subTexts");
  const subtexts = subtextsResult.subTexts;

  // Use Knuth Morris Pratt (KMP) Pattern Searching algorithm to find the location of the subtexts
  const results = subtexts.map((subtext) => {
    const result = [];
    const lowerSubtext = subtext.toLowerCase();
    const lps = generateLPS(subtext);
    let i = 0;
    let j = 0;

    while (i < lowerText.length) {
      if (lowerSubtext[j] === lowerText[i]) {
        j += 1;
        i += 1;
      }
      if (j === lowerSubtext.length) {
        result.push(i - j);
        j = lps[j - 1];
      } else if (i < lowerText.length && lowerSubtext[j] !== lowerText[i]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i += 1;
        }
      }
    }

    return { subtext, result };
  });

  return {
    text,
    subtexts,
    results,
  };
}

// Genereate longest proper prefix which is also suffix array to be used by KMP
function generateLPS(subtext: string): Array<number> {
  let i = 1;
  let len = 0;
  const lps: Array<number> = Array(subtext.length).fill(0);

  while (i < subtext.length) {
    if (subtext[i] === subtext[len]) {
      len += 1;
      lps[i] = len;
      i += 1;
    } else if (len !== 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i += 1;
    }
  }

  return lps;
}
