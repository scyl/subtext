import { fetchRetry } from "utils";
import { SubtextSearchResult } from "objects/text/types";

// Do subtext search from text provided by Reckon
export async function subtextSearch(): Promise<SubtextSearchResult> {
  // Fetches the text to search from
  const { text }: { text: string } = await fetchRetry("https://join.reckon.com/test2/textToSearch");
  // The search is case insensitive, so we can convert it to all lower case
  const lowerText = text.toLowerCase();

  // Fetches the subtexts to search for
  const subtextsResult: { subTexts: Array<string> } = await fetchRetry("https://join.reckon.com/test2/subTexts");
  const subtexts = subtextsResult.subTexts;

  // Search for each of the subtext in the text to search
  const results = subtexts.map((subtext) => {
    const result = kmpSearch(lowerText, subtext.toLowerCase());
    return { subtext, result };
  });

  return {
    text,
    subtexts,
    results,
  };
}

// Use Knuth Morris Pratt (KMP) pattern searching algorithm to find the location of the subtexts
function kmpSearch(text: string, subtext: string): Array<number> {
  if (subtext.length === 0) {
    return [];
  }

  const result = [];
  const lps = generateLps(subtext);
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (subtext[j] === text[i]) {
      j += 1;
      i += 1;
    }
    if (j === subtext.length) {
      result.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && subtext[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i += 1;
      }
    }
  }

  return result;
}

// Generate longest proper prefix which is also suffix array to be used by KMP
function generateLps(subtext: string): Array<number> {
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
