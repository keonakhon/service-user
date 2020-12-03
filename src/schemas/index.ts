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
    errors: [FbLoginError]
  }

  input authResponse {
    accessToken: String
    expiresIn: String
    signedRequest: String
    userID: String
  }

  interface LoginError {
    message: String
  }

  type EmailIsRequired implements LoginError {
    message: String
  }

  union FbLoginError = EmailIsRequired
`;

export default typeDefs;
