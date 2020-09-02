/* User Helper */
import axios from "axios";

// Models
import UserModel from "../models/user";
import UserTokenModel from "../models/user_token";

interface FacebookPermissionType {
  permission: string;
  status: string;
}

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
  }

  /* Check if user already existed */
  async CheckUser() {
    try {
      const fbGraphURL = "https://graph.facebook.com";
      const fbUserToken = this.accessToken;
      const ipAddress = this.ipAddress;

      // Inspect Token from facebook api
      const fbIndpectorToken = await axios.get(
        `${fbGraphURL}/debug_token?input_token=${fbUserToken}&access_token=${process.env.facebook_app_access_token}`
      );
      const userID = fbIndpectorToken.data.data.user_id;

      // User Data from facebook api
      const fbUserData = await axios.get(
        `${fbGraphURL}/${userID}?fields=id,name,permissions&access_token=${fbUserToken}`
      );
      const fbData = fbUserData.data;
      const fbUserID = fbData.id;
      const fbUserFullname = fbData.id;

      // Check Permissions
      const fbEmailPermission = await fbData.permissions.data.find(
        ({ permission, status }: FacebookPermissionType) =>
          permission === "email" && status === "granted"
      );
      if (!fbEmailPermission) {
        throw "Please allow us to get your email";
      }

      const userData = await UserModel.findOne({
        "facebook.facebook_id": fbUserID
      });

      if (userData) {
        return this.Login(userData, fbUserFullname, fbUserToken, ipAddress);
      }
    } catch (err) {
      return new Error(err);
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
        user_id,
        access_token: accessToken,
        refresh_token: refreshToken
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default FacebookHelper;
