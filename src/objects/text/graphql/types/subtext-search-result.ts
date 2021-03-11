import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from "graphql";
import { GraphQLSubtextResult } from "./subtext-result";

export const GraphQLSubtextSearchResult = new GraphQLObjectType({
  name: "SubtextSearchResult",

  description: "Results of a subtext search",

  fields: {
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Original text to search from",
    },
    subtexts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: "Subtext to search for",
    },
    results: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLSubtextResult))),
      description: "Results of the search",
    },
  },
});
