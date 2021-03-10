import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { version } from "objects/api/graphql/resolvers";

export const GraphQLApi = new GraphQLObjectType({
  name: "API",

  description: "Information about the API",

  fields: {
    version: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Version of the API",
      resolve: version,
    },
  },
});
