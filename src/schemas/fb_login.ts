/* Query Schema - FbLogin */
import { gql } from "apollo-server";

const fbLoginTypeDefs = gql`
  extend type Query {
    FbLogin(status: String!, authResponse: authResponse): LoginWithFacebook
  }

  type LoginWithFacebook {
    user: UserResponse
    errors: [FbLoginError]
  }

  type UserResponse {
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

  type EmailIsRequired implements LoginError {
    message: String
  }

  union FbLoginError = EmailIsRequired
`;

export default fbLoginTypeDefs;
