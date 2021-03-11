export type SubtextSearchResult = {
  text: string;
  subtexts: Array<string>;
  results: Array<{subtext: string, result: Array<string>}>;
}
