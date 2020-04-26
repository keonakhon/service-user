import express from "express";
import graphqlHTTP from "express-graphql";

// graphql schema
import schema from "./schemas/user";

// graphql resolver
import resolvers from "./resolvers/user";

const app = express();
const port = 8080; // default port to listen

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
