/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import { fbLogin } from "./query/login";
import { myProfile, userProfile } from "./query/user";
import { updateMyProfile, updateUsername } from "./mutation/user";

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
    updateMyProfile,
    updateUsername
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
  DatabaseError: {
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
      if (obj.__typename === "InvalidToken") {
        return "InvalidToken";
      }
      if (obj.__typename === "UsernameAlreadyExists") {
        return "UsernameAlreadyExists";
      }

      return "SomethingWrong";
    }
  }
};

export default resolvers;
