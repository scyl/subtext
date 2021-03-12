import { SubmissionResult } from "objects/text/types";

import { subtextSearchAndSubmit } from "objects/text/data";

export function subtextSearchAndSubmitResolver(): Promise<SubmissionResult> {
  return subtextSearchAndSubmit();
}
