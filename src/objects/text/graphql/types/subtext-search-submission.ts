import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from "graphql";
import { GraphQLSubtextResult } from "./subtext-result";

export const GraphQLSubtextSearchSubmission = new GraphQLObjectType({
  name: "SubtextSearchSubmission",

  description: "Subtext search submission",

  fields: {
    candidate: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Name of the candidate",
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Text to search from",
    },
    results: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLSubtextResult))),
      description: "Results of the subtext search",
    },
  },
});
