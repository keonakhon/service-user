/* User - User Schema */
import { Schema, model } from "mongoose";

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

const UserModel = model("fw_user", UserSchema);

export default UserModel;
