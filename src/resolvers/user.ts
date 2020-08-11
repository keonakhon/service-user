// User Resolver
import axios from "axios";

interface FacebookLogin {
  status: string;
  authResponse: {
    accessToken: String;
    expiresIn: String;
    signedRequest: String;
    userID: String;
  };
}

// Facebook Login
const fbLogin = async ({ status, authResponse }: FacebookLogin) => {
  try {
    if (status === "connected") {
      const userToken = authResponse.accessToken;

      // Inspect Token from facebook api
      const indpectorToken = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${process.env.facebook_app_access_token}`
      );
      const userID = indpectorToken.data.data.user_id;

      // User Data from facebook api
      const userData = await axios.get(
        `https://graph.facebook.com/${userID}?fields=id,name&access_token=${userToken}`
      );

      return { status };
    }
  } catch (err) {
    // console.error(err);
  }
};

export { fbLogin };
