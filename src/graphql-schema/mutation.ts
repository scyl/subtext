import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import * as text from "objects/text/graphql";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    text: {
      type: new GraphQLNonNull(text.types.GraphQLTextMutation),
      resolve: text.resolvers.text,
    },
  },
});
