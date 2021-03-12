import { subtextSearch } from "objects/text/data";
import { subtextSearchResolver } from "./subtext-search";

jest.mock("objects/text/data/subtext-search");

describe("objects.text.graphql.resolvers.subtextSearch()", () => {
  const mockedSubtextSearch = subtextSearch as jest.Mock;

  beforeEach(() => {
    mockedSubtextSearch.mockResolvedValue({
      text: "this is the string to search from",
      subtexts: ["subtext1", "another", "subtext"],
      results: [
        { subtext: "subtext1", result: [1, 4] },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("searches for subtext", async () => {
    await subtextSearchResolver();

    expect(mockedSubtextSearch).toBeCalledTimes(1);
  });

  it("return the formatted result", async () => {
    const result = await subtextSearchResolver();

    expect(result).toStrictEqual({
      text: "this is the string to search from",
      subtexts: ["subtext1", "another", "subtext"],
      results: [
        { subtext: "subtext1", result: "2, 5" },
      ],
    });
  });
});
