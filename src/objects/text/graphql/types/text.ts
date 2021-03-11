import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { subtextSearch } from "objects/text/graphql/resolvers";
import { GraphQLSubtextSearchResult } from "./subtext-search-result";

export const GraphQLText = new GraphQLObjectType({
  name: "Text",

  description: "Text queries",

  fields: {
    subtextSearch: {
      type: new GraphQLNonNull(GraphQLSubtextSearchResult),
      description: "Search for subtext in a string",
      resolve: subtextSearch,
    },
  },
});
