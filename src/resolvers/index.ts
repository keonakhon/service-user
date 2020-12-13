/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import { FbLogin } from "./query/login";
import { UserProfile } from "./query/user";

interface FacebookLogin {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  };
}

const resolvers: IResolvers = {
  Query: {
    // Facebook Login
    FbLogin,
    UserProfile
  },
  LoginError: {
    __resolveType() {
      return;
    }
  },
  FbLoginError: {
    __resolveType(obj: any, context: any, info: any) {
      console.log("union", obj);
      return "EmailIsRequired";
    }
  }
};

export default resolvers;
