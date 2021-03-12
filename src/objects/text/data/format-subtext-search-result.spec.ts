import { formatSubtextSearchResult } from "./format-subtext-search-result";

describe("objects.text.data.formatSubtextSearchResult()", () => {
  const searchResult = {
    text: "this is the string to search from",
    subtexts: ["subtext1", "another", "subtext"],
    results: [
      { subtext: "subtext1", result: [1, 4] },
      { subtext: "another", result: [8, 12] },
      { subtext: "subtext", result: [] },
    ],
  };

  it("returns the text used in the search", () => {
    const result = formatSubtextSearchResult(searchResult);

    expect(result).toMatchObject({ text: "this is the string to search from" });
  });

  it("returns all the subtext searched", () => {
    const result = formatSubtextSearchResult(searchResult);

    expect(result).toMatchObject({ subtexts: ["subtext1", "another", "subtext"] });
  });

  it("returns result for each subtext in the search", () => {
    const result = formatSubtextSearchResult(searchResult);

    expect(result).toMatchObject({
      results: [
        { subtext: "subtext1", result: "2, 5" },
        { subtext: "another", result: "9, 13" },
        { subtext: "subtext", result: "<No Output>" },
      ],
    });
  });
});
