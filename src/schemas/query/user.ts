/* Query Schema - User */
import { gql } from "apollo-server";

const userTypeDefs = gql`
  extend type Query {
    myProfile: MyProfileType
  }

  type MyProfileType {
    user: MyUserProfileResponseType
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
  }

  type Unauthentication implements LoginError {
    message: String
  }

  union UserProfileError = Unauthentication | SomethingWrong
`;

export default userTypeDefs;
