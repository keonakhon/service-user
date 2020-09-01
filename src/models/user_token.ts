/* User - User Token Schema */
import { Schema, model } from "mongoose";

const UserTokenSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "fw_user",
      default: null
    },
    provider: { type: String, enum: ["facebook"], default: "facebook" },
    facebook: {
      facebook_name: { type: String, default: null },
      facebook_access_token: { type: String, default: null }
    },
    current_access_token: { type: String, default: null },
    current_refresh_token: { type: String, default: null },
    tokens: [
      {
        access_token: { type: String, default: null },
        refresh_token: { type: String, default: null },
        ip: { type: String, default: null },
        created_date: { type: Date, default: null }
      }
    ],
    created_date: { type: Date, default: Date.now }
  },
  {
    collection: "fw_user_token"
  }
);

const UserTokenModel = model("fw_user_token", UserTokenSchema);

export default UserTokenModel;
