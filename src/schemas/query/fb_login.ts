/* Query Schema - Facebook Login */
import { gql } from "apollo-server";

const fbLoginTypeDefs = gql`
  extend type Query {
    fbLogin(status: String!, authResponse: authResponse): LoginWithFacebook
  }

  type LoginWithFacebook {
    success: Boolean!
    user: UserResponse
    errors: [FbLoginError]
  }

  type UserResponse {
    user_id: String
    access_token: TokenResponse
    refresh_token: TokenResponse
    display_name: String
  }

  type TokenResponse {
    token: String
    expires_in: String
  }

  input authResponse {
    accessToken: String
    expiresIn: String
    signedRequest: String
    userID: String
  }

  type EmailIsRequired implements Unauthentication {
    message: String
  }

  union FbLoginError = EmailIsRequired | SomethingWrong
`;

export default fbLoginTypeDefs;
