import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input authResponse {
    accessToken: String,
    expiresIn: String,
    signedRequest: String,
    userID: String
  }

  type LoginWithFB {
    status: String
  }

  type Query {
    hello: String
    fbLogin(status: String!, authResponse: authResponse ): LoginWithFB
  },
`);

export default schema;
