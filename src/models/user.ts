import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  display_name: { type: String },
  email: { type: String },
  password: { type: String },
  banned_id: { type: String },
  ip: { type: String },
  created_date: { type: String, default: Date.now },
  facebook: {
    type: {
      facebook_access_token: { type: String },
      facebook_id: { type: String }
    },
    default: null
  },
  birthdate: { type: Date },
  gender: { type: String }
});

const UserModel = model("User", UserSchema);

export default UserModel;
