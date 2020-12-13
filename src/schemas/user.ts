/* Query Schema - User */
import { gql } from "apollo-server";

const userTypeDefs = gql`
  extend type Query {
    UserProfile: UserProfile
  }

  type UserProfile {
    user: UserProfileResponse
    errors: [UserProfileError!]!
  }

  type UserProfileResponse {
    _id: String
    username: String
    add_username: Boolean
    display_name: String
    email: String
    birthdate: String
    gender: String
  }

  type Unauthentication implements LoginError {
    message: String
  }

  union UserProfileError = Unauthentication
`;

export default userTypeDefs;
