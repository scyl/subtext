import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLSubtextSearchSubmission } from "./subtext-search-submission";

export const GraphQLSubtextSearchAndSubmit = new GraphQLObjectType({
  name: "SubtextSearchAndSubmit",

  description: "Results of a subtext search submission",

  fields: {
    submitted: {
      type: new GraphQLNonNull(GraphQLSubtextSearchSubmission),
      description: "The search result submitted",
    },
    response: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Response from the server",
    },
  },
});
