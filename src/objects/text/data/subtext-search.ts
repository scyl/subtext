import { fetchRetry } from "utils";
import { SubtextSearchResult } from "objects/text/types";

export async function subtextSearch(): Promise<SubtextSearchResult> {
  const { text }: { text: string } = await fetchRetry("https://join.reckon.com/test2/textToSearch");
  const lowerText = text.toLowerCase();
  const subtextsResult: { subTexts: Array<string> } = await fetchRetry("https://join.reckon.com/test2/subTexts");
  const subtexts = subtextsResult.subTexts;

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
