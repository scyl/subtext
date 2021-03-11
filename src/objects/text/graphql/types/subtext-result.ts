import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from "graphql";

export const GraphQLSubtextResult = new GraphQLObjectType({
  name: "SubtextResult",

  description: "Results of a single subtext",

  fields: {
    subtext: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Original text to search from",
    },
    result: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: "Indexes where this subtext appears",
    },
  },
});
