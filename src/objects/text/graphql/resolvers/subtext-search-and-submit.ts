import { SubmissionResult } from "objects/text/types";

import { subtextSearchAndSubmit } from "objects/text/data";

export async function subtextSearchAndSubmitResolver(): Promise<SubmissionResult> {
  const x = await subtextSearchAndSubmit();
  console.log(JSON.stringify(x));

  return subtextSearchAndSubmit();
}
