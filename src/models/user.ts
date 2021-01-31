/* User - User Schema */
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

import config from "../configs/keys";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, lowercase: true },
    add_username: { type: Boolean, default: false },
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
        },
        facebook_email: {
          type: String,
          lowercase: true
        }
      },
      default: null
    },
    birthdate: { type: Date, default: null },
    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Agender",
        "Androgyne",
        "Androgynous",
        "Bigender",
        "Cis",
        "Cis Female",
        "Cis Male",
        "Cis Man",
        "Cis Woman",
        "Cisgender",
        null
      ],
      default: null
    },
    gen_id: { type: String, unique: true, lowercase: true },
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
