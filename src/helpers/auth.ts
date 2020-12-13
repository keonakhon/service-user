/* Authentication Helper */
import jwt from "jsonwebtoken";

// Configs
import keys from "../configs/keys";

// Models
import UserModel from "../models/user";

const AuthHelper = (context: any) => {
  try {
    const { token } = context;
    return jwt.verify(
      token,
      keys.access_token_secret,
      (err: any, decoded: any) => {
        if (err) return false;

        const userData = UserModel.findById(decoded._id);

        return userData;
      }
    );
  } catch (err) {
    return false;
  }
};
export default AuthHelper;
