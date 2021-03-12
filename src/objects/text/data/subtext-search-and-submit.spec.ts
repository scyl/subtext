import { fetchRetry } from "utils";
import { subtextSearch } from "objects/text/data";
import { subtextSearchAndSubmit } from "./subtext-search-and-submit";

jest.mock("utils/fetch-retry");
jest.mock("objects/text/data/subtext-search");

describe("objects.text.data.subtextSearchAndSubmit()", () => {
  const mockedFetchRetry = fetchRetry as jest.Mock;
  const mockedSubtextSearch = subtextSearch as jest.Mock;

  beforeEach(() => {
    mockedFetchRetry.mockResolvedValue({ result: "congrats" });
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
    await subtextSearchAndSubmit();

    expect(mockedSubtextSearch).toBeCalledTimes(1);
  });

  it("submit the search result", async () => {
    await subtextSearchAndSubmit();

    expect(mockedFetchRetry).toBeCalledTimes(1);
    expect(mockedFetchRetry).nthCalledWith(1, "https://join.reckon.com/test2/submitResults", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate: "Stephen Leung",
        text: "this is the string to search from",
        results: [{ subtext: "subtext1", result: "2, 5" }],
      }),
    });
  });

  it("return the submitted data", async () => {
    const result = await subtextSearchAndSubmit();

    expect(result).toMatchObject({
      submitted: {
        candidate: "Stephen Leung",
        text: "this is the string to search from",
        results: [{ subtext: "subtext1", result: "2, 5" }],
      },
    });
  });

  it("return the submission server response", async () => {
    const result = await subtextSearchAndSubmit();

    expect(result).toMatchObject({
      response: "congrats",
    });
  });
});
