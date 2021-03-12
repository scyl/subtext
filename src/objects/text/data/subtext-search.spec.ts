import { fetchRetry } from "utils";
import { subtextSearch } from "./subtext-search";

jest.mock("utils/fetch-retry");

describe("objects.text.data.subtextSearch()", () => {
  const mockedFetchRetry = fetchRetry as jest.Mock;

  beforeEach(() => {
    mockedFetchRetry.mockResolvedValueOnce({ text: "this is the string to search from" });
    mockedFetchRetry.mockResolvedValueOnce({ subTexts: ["is", "s"] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches the text to search from", async () => {
    await subtextSearch();

    expect(mockedFetchRetry).toBeCalledTimes(2);
    expect(mockedFetchRetry).nthCalledWith(1, "https://join.reckon.com/test2/textToSearch");
  });

  it("fetches the subtexts to search for", async () => {
    await subtextSearch();

    expect(mockedFetchRetry).toBeCalledTimes(2);
    expect(mockedFetchRetry).nthCalledWith(2, "https://join.reckon.com/test2/subTexts");
  });

  it("returns the text used in the search", async () => {
    const result = await subtextSearch();

    expect(result).toMatchObject({ text: "this is the string to search from" });
  });

  it("returns all the subtext to search for", async () => {
    const result = await subtextSearch();

    expect(result).toMatchObject({ subtexts: ["is", "s"] });
  });

  it("returns all the subtext search results", async () => {
    const result = await subtextSearch();

    expect(result).toMatchObject({
      results: [
        { subtext: "is", result: [2, 5] },
        { subtext: "s", result: [3, 6, 12, 22] },
      ],
    });
  });

  it("returns subtext search results when the subtext doesn't exist", async () => {
    mockedFetchRetry.mockReset();
    mockedFetchRetry.mockResolvedValueOnce({ text: "this is the string to search from" });
    mockedFetchRetry.mockResolvedValueOnce({ subTexts: ["zoo"] });
    const result = await subtextSearch();

    expect(result).toMatchObject({
      results: [
        { subtext: "zoo", result: [] },
      ],
    });
  });

  it("returns subtext search results when the subtext is the empty string", async () => {
    mockedFetchRetry.mockReset();
    mockedFetchRetry.mockResolvedValueOnce({ text: "this is the string to search from" });
    mockedFetchRetry.mockResolvedValueOnce({ subTexts: [""] });
    const result = await subtextSearch();

    expect(result).toMatchObject({
      results: [
        { subtext: "", result: [] },
      ],
    });
  });
});
