/* Query Schema - Facebook Login */
import { gql } from "apollo-server";

const fbLoginTypeDefs = gql`
  extend type Query {
    fbLogin(status: String!, authResponse: authResponse): LoginWithFacebook
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

  union FbLoginError = EmailIsRequired | SomethingWrong
`;

export default fbLoginTypeDefs;
