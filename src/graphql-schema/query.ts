import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import * as api from "objects/api/graphql";
import * as text from "objects/text/graphql";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    api: {
      type: new GraphQLNonNull(api.types.GraphQLApi),
      resolve: api.resolvers.api,
    },
    text: {
      type: new GraphQLNonNull(text.types.GraphQLText),
      resolve: text.resolvers.text,
    },
  },
});
