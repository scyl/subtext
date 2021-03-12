import { GraphQLObjectType, GraphQLFieldConfigMap, GraphQLNonNull } from "graphql";
import { subtextSearchAndSubmit } from "objects/text/graphql/resolvers";
import { GraphQLSubtextSearchAndSubmit } from "./subtext-search-and-submit";

export const GraphQLTextMutation = new GraphQLObjectType({
  name: "TextMutation",

  description: "Text mutations",

  fields: (): GraphQLFieldConfigMap<any, any> => ({
    subtextSearchAndSubmit: {
      type: new GraphQLNonNull(GraphQLSubtextSearchAndSubmit),
      description: "Search for subtext in a string and submit the result",
      resolve: subtextSearchAndSubmit,
    },
  }),
});
