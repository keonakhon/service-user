/* User Helper */
import axios from "axios";

// Models
import UserModel from "./../models/user";
import UserTokenSchema from "./../models/user_token";

class UserHelper {
  accessToken: string;
  expiresIn: string;
  signedRequest: string;
  userID: string;
  ipAddress: string;

  constructor(
    accessToken: string,
    expiresIn: string,
    signedRequest: string,
    userID: string,
    ipAddress: string
  ) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.signedRequest = signedRequest;
    this.userID = userID;
    this.ipAddress = ipAddress;

    this.CheckUser();
  }

  /* Check if user already existed */
  async CheckUser() {
    try {
      const fbUserToken = this.accessToken;

      // Inspect Token from facebook api
      const fbIndpectorToken = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${fbUserToken}&access_token=${process.env.facebook_app_access_token}`
      );
      const userID = fbIndpectorToken.data.data.user_id;

      // User Data from facebook api
      const fbUserData = await axios.get(
        `https://graph.facebook.com/${userID}?fields=id,name&access_token=${fbUserToken}`
      );
      const fbUserID = fbUserData.data.id;
      const fbUserFullname = fbUserData.data.id;

      const userData = await UserModel.findOne({
        "facebook.facebook_id": fbUserID
      });

      return userData;
    } catch (err) {
      throw new Error(err);
    }
  }

  async login() {}
}

export default UserHelper;
