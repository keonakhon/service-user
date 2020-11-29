import { buildSchema } from "graphql";
import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    Hello: String
    FbLogin(status: String!, authResponse: authResponse): LoginWithFacebook
  }

  type LoginWithFacebook {
    user_id: String
    access_token: String
    refresh_token: String
  }

  input authResponse {
    accessToken: String
    expiresIn: String
    signedRequest: String
    userID: String
  }

  type EmailIsRequired {
    message: String
  }
`;

export default typeDefs;
