import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const GraphQLSubtextResult = new GraphQLObjectType({
  name: "SubtextResult",

  description: "Results of a single subtext",

  fields: {
    subtext: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Original text to search from",
    },
    result: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Indexes where this subtext appears",
    },
  },
});
