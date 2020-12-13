/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import { FbLogin } from "./query/login";
import { MyProfile } from "./query/user";

// Main Resolver
const resolvers: IResolvers = {
  /* Query */
  Query: {
    FbLogin,
    MyProfile
  },
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
