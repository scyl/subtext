import { FormattedSubtextResult } from "objects/text/types";

export type FormattedSubtextSearchResult = {
  text: string;
  subtexts: Array<string>;
  results: Array<FormattedSubtextResult>;
}
