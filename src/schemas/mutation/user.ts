/* Mutation Schema - User */
import { gql } from "apollo-server";

const updateMyProfile = gql`
  extend type Mutation {
    updateMyProfile(input: inputProfileUpdate): updateMyProfile
    updateUsername(input: InputeUsernameUpdate): UpdateUserNameType
  }

  input inputProfileUpdate {
    display_name: String
    birthdate: String
    gender: String
    bio: String
  }

  input InputeUsernameUpdate {
    username: String!
  }

  type updateMyProfile {
    success: Boolean!
    user: UpdateMyProfileSuccess
    errors: [UpdateMyProfileErrorUnion!]!
  }

  type UpdateUserNameType {
    success: Boolean!
    user: UpdateUsernameSuccess
    errors: [UpdateMyProfileErrorUnion!]!
  }

  type UpdateMyProfileSuccess {
    _id: String
    user_id: String
    display_name: String
    birthdate: String
    gender: String
    bio: String
  }

  type UpdateUsernameSuccess {
    _id: String
    user_id: String
    username: String
  }

  type UsernameAlreadyExists implements DatabaseError {
    message: String
  }

  union UpdateMyProfileErrorUnion =
      InvalidToken
    | SomethingWrong
    | UsernameAlreadyExists
`;

export default updateMyProfile;
