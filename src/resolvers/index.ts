/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import { fbLogin } from "./query/login";
import { myProfile, userProfile } from "./query/user";
import { updateMyProfile } from "./mutation/user";

// Main Resolver
const resolvers: IResolvers = {
  /* Query */
  Query: {
    fbLogin,
    myProfile,
    userProfile
  },
  /* Mutation */
  Mutation: {
    updateMyProfile
  },
  /* Interface */
  ServerError: {
    __resolveType() {
      return;
    }
  },
  Unauthentication: {
    __resolveType() {
      return;
    }
  },
  /* Union */
  FbLoginError: {
    __resolveType(obj: any) {
      if (obj.__typename === "EmailIsRequired") return "EmailIsRequired";
      return "SomethingWrong";
    }
  },
  UserProfileError: {
    __resolveType(obj: any) {
      if (obj.__typename === "InvalidToken") return "InvalidToken";
      return "SomethingWrong";
    }
  },
  UpdateMyProfileErrorUnion: {
    __resolveType(obj: any) {
      if (obj.__typename === "InvalidToken") return "InvalidToken";
      return "SomethingWrong";
    }
  }
};

export default resolvers;
