import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { GraphQLApi } from "objects/api/graphql/type/api";
import { api } from "objects/api/graphql/resolvers";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    api: {
      type: new GraphQLNonNull(GraphQLApi),
      resolve: api,
    },
  },
});
