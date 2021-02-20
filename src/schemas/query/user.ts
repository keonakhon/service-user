/* Query Schema - User */
import { gql } from "apollo-server";

const userTypeDefs = gql`
  extend type Query {
    myProfile: MyProfileType
    userProfile(username: String!): UserProfileType
  }

  type MyProfileType {
    success: Boolean!
    user: MyUserProfileResponseType
    errors: [UserProfileError!]!
  }

  type UserProfileType {
    success: Boolean!
    user: UserProfileResponseType
    errors: [UserProfileError!]!
  }

  type MyUserProfileResponseType {
    _id: String
    username: String
    add_username: Boolean
    display_name: String
    email: String
    birthdate: String
    gender: String
    user_id: String
    bio: String
  }

  type UserProfileResponseType {
    username: String
    display_name: String
    bio: String
  }

  union UserProfileError = InvalidToken | SomethingWrong
`;

export default userTypeDefs;
