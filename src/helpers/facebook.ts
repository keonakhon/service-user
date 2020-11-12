/* Facebook Helper */
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
      const appID = process.env.facebook_app_id;
      const appSecret = process.env.facebook_app_secret;

      // App Access Token
      const appAccessTokenData = await axios.get(
        `${fbGraphURL}/oauth/access_token?client_id=${appID}&client_secret=${appSecret}&grant_type=client_credentials`
      );
      const appAccessToken = appAccessTokenData.data.access_token;

      // Inspect Token from facebook api
      const fbIndpectorToken = await axios.get(
        `${fbGraphURL}/debug_token?input_token=${fbUserToken}&access_token=${appAccessToken}`
      );
      const userID = fbIndpectorToken.data.data.user_id;

      // User Data from facebook api
      const fbUserData = await axios.get(
        `${fbGraphURL}/${userID}?fields=id,name,email,permissions&access_token=${fbUserToken}`
      );
      const fbData = fbUserData.data;

      // Check Permissions
      const fbEmailPermission = await fbData.permissions.data.find(
        ({ permission, status }: FacebookPermissionType) =>
          permission === "email" && status === "granted"
      );
      if (!fbEmailPermission) {
        throw "Please allow us to get your email";
      }

      const fbUserID = fbData.id;
      const fbUserFullname = fbData.name;
      const fbUserEmail = fbData.email;

      // If data existed, login. Otherwise signup
      const userData = await UserModel.findOne({
        "facebook.facebook_id": fbUserID
      });
      if (userData) {
        return this.Login(userData, fbUserFullname, fbUserToken, ipAddress);
      } else {
        return this.SignUp(
          fbUserEmail,
          fbUserID,
          fbUserFullname,
          fbUserToken,
          ipAddress
        );
      }
    } catch (err) {
      return new Error(err);
    }
  }

  // Login Method
  private async Login(
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

  // Sign Up Method
  private async SignUp(
    email: string,
    facebook_id: string,
    facebook_name: string,
    facebook_access_token: string,
    ipAddress: string
  ) {
    try {
      // Create a unique username
      const mockUsername = Date.now();

      const userObj = new UserModel({
        email,
        facebook: { facebook_id },
        username: mockUsername
      });

      const userData = await userObj.save();

      return this.Login(
        userData,
        facebook_name,
        facebook_access_token,
        ipAddress
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default FacebookHelper;
