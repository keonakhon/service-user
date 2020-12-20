/* Mutation Schema - User */
import { gql } from "apollo-server";

const updateMyProfile = gql`
  extend type Mutation {
    updateMyProfile(input: inputProfileUpdate): updateMyProfile
  }

  input inputProfileUpdate {
    username: String
    display_name: String
    email: String
    birthdate: String
    gender: String
  }

  type updateMyProfile {
    errors: [UpdateUserError]
  }

  union UpdateUserError = SomethingWrong
`;

export default updateMyProfile;
