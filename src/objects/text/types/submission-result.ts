import { FormattedSubtextResult } from "objects/text/types";

export type SubmissionResult = {
  submitted: {
    candidate: string;
    text: string;
    results: Array<FormattedSubtextResult>;
  },
  response: string;
}
