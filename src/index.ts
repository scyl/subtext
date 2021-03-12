import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { query, mutation } from "./graphql-schema";

const schema = new GraphQLSchema({ query, mutation });

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(9999);

// eslint-disable-next-line no-console
console.log("Running GraphQL API server at http://localhost:9999/graphql");
