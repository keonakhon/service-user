/* User Resolver */
// Helpers
import FacebookHelper from "../helpers/facebook";

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
const FbLogin = async (
  _: any,
  { status, authResponse }: FacebookLogin,
  context: any
) => {
  try {
    const { ip_address } = await context();

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
    return new Error(err);
  }
};

export { FbLogin };
