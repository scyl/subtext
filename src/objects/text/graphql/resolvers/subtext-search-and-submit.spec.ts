import { subtextSearchAndSubmit } from "objects/text/data";
import { subtextSearchAndSubmitResolver } from "./subtext-search-and-submit";

jest.mock("objects/text/data/subtext-search-and-submit");

describe("objects.text.graphql.resolvers.subtextSearch()", () => {
  const mockedSubtextSearchAndSubmit = subtextSearchAndSubmit as jest.Mock;

  beforeEach(() => {
    mockedSubtextSearchAndSubmit.mockResolvedValue({
      submitted: {
        candidate: "Stephen Leung",
        text: "this is the string to search from",
        results: [{ subtext: "subtext1", result: "2, 5" }],
      },
      response: "congrats",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("searches for subtext and submit result", async () => {
    await subtextSearchAndSubmitResolver();

    expect(mockedSubtextSearchAndSubmit).toBeCalledTimes(1);
  });

  it("return the submission result", async () => {
    const result = await subtextSearchAndSubmitResolver();

    expect(result).toStrictEqual({
      submitted: {
        candidate: "Stephen Leung",
        text: "this is the string to search from",
        results: [{ subtext: "subtext1", result: "2, 5" }],
      },
      response: "congrats",
    });
  });
});
