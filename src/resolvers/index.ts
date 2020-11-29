/* Index Resolver */
import { IResolvers } from "apollo-server";

// Resolvers
import FacebookHelper from "../helpers/facebook";
// import { FbLogin } from "./user";

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
    Hello: () => "Hello world!",
    // Facebook Login

    FbLogin: async (
      _: any,
      { status, authResponse }: FacebookLogin,
      context: any
    ) => {
      try {
        const { ip_address } = await context;

        if (status === "connected") {
          const facebookClass = new FacebookHelper(
            authResponse.accessToken,
            authResponse.expiresIn,
            authResponse.signedRequest,
            authResponse.userID,
            ip_address
          );

          const userData = await facebookClass.CheckUser();

          return userData;
        }
      } catch (err) {
        console.error(err);
        return new Error(err);
      }
    }
  }
};

export default resolvers;
