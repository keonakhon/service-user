/* Query - Login Resolver */
// Helpers
import FacebookHelper from "../../helpers/facebook";
import * as ErrorHandler from "../../helpers/errors/english.json";

interface FacebookLogin {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  };
}

// Facebook Login
const fbLogin = async (
  _: any,
  { status, authResponse }: FacebookLogin,
  context: any
) => {
  try {
    const ip_address = "::1";

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
    return ErrorHandler.SomethingWrong;
  }
};

export { fbLogin };
