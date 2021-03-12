/* eslint-disable no-console */
import fetch from "node-fetch";

import { fetchRetry } from "./fetch-retry";

jest.mock("node-fetch");

describe("utils.fetchRetry()", () => {
  const mockedFetch = fetch as any as jest.Mock;
  const mockedWarn = jest.fn();

  const originalWarn = console.warn;

  beforeEach(() => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ body: "body" }),
    });

    console.warn = mockedWarn;
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.warn = originalWarn;
  });

  it("fetch from the specified url", async () => {
    await fetchRetry("link/to/somewhere");

    expect(mockedFetch).toBeCalledTimes(1);
    expect(mockedFetch).nthCalledWith(1, "link/to/somewhere", undefined);
  });

  it("fetch from the specified url with the specified options", async () => {
    await fetchRetry("link/to/somewhere", { method: "POST" });

    expect(mockedFetch).toBeCalledTimes(1);
    expect(mockedFetch).nthCalledWith(1, "link/to/somewhere", { method: "POST" });
  });

  it("return the body of the response", async () => {
    const result = await fetchRetry("link/to/somewhere");

    expect(result).toStrictEqual({ body: "body" });
  });

  it("retry the fetch if the link returned an error", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "no good",
    });
    await fetchRetry("link/to/somewhere");

    expect(mockedFetch).toBeCalledTimes(2);
    expect(mockedWarn).toBeCalledTimes(1);
    expect(mockedWarn).nthCalledWith(1, "NETWORK_ERROR: unable to fetch \"link/to/somewhere\". ", "no good");
  });

  it("retry the fetch if the fetch throws an error", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("no good"));
    await fetchRetry("link/to/somewhere");

    expect(mockedFetch).toBeCalledTimes(2);
    expect(mockedWarn).toBeCalledTimes(1);
    expect(mockedWarn).nthCalledWith(1, "NETWORK_ERROR: unable to fetch \"link/to/somewhere\". ", "no good");
  });
});
