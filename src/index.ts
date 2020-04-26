import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

const app = express();
const port = 8080; // default port to listen

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Provide resolver functions for your schema fields
const resolvers = {
  hello: () => "Hello world!"
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
