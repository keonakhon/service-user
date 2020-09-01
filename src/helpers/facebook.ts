/* User Helper */
import axios from "axios";

// Models
import UserModel from "../models/user";
import UserTokenModel from "../models/user_token";

class FacebookHelper {
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
      const ipAddress = this.ipAddress;

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

      if (userData) {
        return this.Login(userData, fbUserFullname, fbUserToken, ipAddress);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async Login(
    userData: any,
    facebook_name: string,
    facebook_access_token: string,
    ipAddress: string
  ) {
    try {
      const accessToken = userData.accessToken(userData._id);
      const refreshToken = userData.refreshToken(userData._id);
      const user_id = userData._id;

      // Save Token
      const userTokenObj = new UserTokenModel({
        user_id,
        facebook: { facebook_name, facebook_access_token },
        current_access_token: accessToken,
        current_refresh_token: refreshToken,
        tokens: [
          {
            access_token: accessToken,
            refresh_token: refreshToken,
            ip: ipAddress,
            created_date: new Date()
          }
        ]
      });
      await userTokenObj.save();

      return {
        "x-auth-access-token": accessToken,
        "x-auth-refresh-token": refreshToken,
        user_id
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default FacebookHelper;
