import { SubmissionResult } from "objects/text/types";
import { fetchRetry } from "utils";
import { subtextSearch, formatSubtextSearchResult } from "objects/text/data";

export async function subtextSearchAndSubmit(): Promise<SubmissionResult> {
  const searchResult = await subtextSearch();
  const formattedResult = formatSubtextSearchResult(searchResult);

  const submission = {
    candidate: "Stephen Leung",
    text: formattedResult.text,
    results: formattedResult.results,
  };

  const submissionResponse = await fetchRetry("https://join.reckon.com/test2/submitResults", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  return {
    submitted: submission,
    response: submissionResponse.result,
  };
}
