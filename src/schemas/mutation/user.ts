/* Mutation Schema - User */
import { gql } from "apollo-server";

const updateMyProfile = gql`
  extend type Mutation {
    updateMyProfile(input: inputProfileUpdate): updateMyProfile
  }

  input inputProfileUpdate {
    display_name: String
    birthdate: String
    gender: String
    bio: String
  }

  type updateMyProfile {
    user: UpdateMyProfileSuccess
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

  union UpdateMyProfileErrorUnion = InvalidToken | SomethingWrong
`;

export default updateMyProfile;
