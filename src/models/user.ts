/* User - User Schema */
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

import config from "../configs/keys";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, lowercase: true },
    display_name: { type: String, default: null },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, default: null },
    banned_id: { type: String, default: null },
    facebook: {
      type: {
        facebook_id: {
          type: String,
          required: true,
          unique: true
        },
        facebook_url: {
          type: String
        }
      },
      default: null
    },
    birthdate: { type: Date, default: null },
    gender: { type: String, enum: ["male", "female", null], default: null },
    created_date: { type: Date, default: Date.now }
  },
  {
    collection: "fw_user"
  }
);

// Custom method for generate access token
UserSchema.methods.accessToken = function (id: string) {
  const token = jwt.sign({ _id: id }, config.access_token_secret, {
    expiresIn: config.access_token_life
  });

  return token;
};

// Custom method for generate refresh token
UserSchema.methods.refreshToken = function (id: string) {
  const token = jwt.sign({ _id: id }, config.refresh_token_secret, {
    expiresIn: config.refresh_token_life
  });

  return token;
};

const UserModel = model("fw_user", UserSchema);

export default UserModel;
