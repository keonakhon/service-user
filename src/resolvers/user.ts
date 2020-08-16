// User Resolver
import axios from "axios";

// Models
import UserModel from "./../models/user";
import UserTokenSchema from "./../models/user_token";

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
      const fbUserToken = authResponse.accessToken;

      // Inspect Token from facebook api
      const fbIndpectorToken = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${fbUserToken}&access_token=${process.env.facebook_app_access_token}`
      );
      const userID = fbIndpectorToken.data.data.user_id;

      // User Data from facebook api
      const fbUserData = await axios.get(
        `https://graph.facebook.com/${userID}?fields=id,name&access_token=${fbUserToken}`
      );

      const userObj = new UserModel({
        facebook: {
          facebook_id: fbUserData.data.id,
          facebook_name: fbUserData.data.name
        }
      });

      await userObj.save();

      return { status };
    }
  } catch (err) {
    console.error(err);
  }
};

export { fbLogin };
