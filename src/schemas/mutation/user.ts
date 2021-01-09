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
  }

  type updateMyProfile {
    user: UpdateMyProfileSuccess
    errors: [UpdateMyProfileErrorUnion]
  }

  type UpdateMyProfileSuccess {
    display_name: String
    birthdate: String
    gender: String
  }

  union UpdateMyProfileErrorUnion = SomethingWrong
`;

export default updateMyProfile;
