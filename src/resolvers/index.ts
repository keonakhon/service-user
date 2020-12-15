/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import { fbLogin } from "./query/login";
import { myProfile } from "./query/user";

// Main Resolver
const resolvers: IResolvers = {
  /* Query */
  Query: {
    fbLogin,
    myProfile
  },
  /* Mutation */
  /* Interface */
  ServerError: {
    __resolveType() {
      return;
    }
  },
  LoginError: {
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
      if (obj.__typename === "Unauthentication") return "Unauthentication";
      return "SomethingWrong";
    }
  }
};

export default resolvers;
