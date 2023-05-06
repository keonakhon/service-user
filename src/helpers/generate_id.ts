/* Generate ID Helper */
// Models
import UserModel from "../models/user";

// Generate User ID
const userGenId: any = async function (data: string) {
  try {
    const genID = Date.now();

    const userData = await UserModel.findOne({ gen_id: genID });

    if (userData) {
      return userGenId(genID + "1");
    } else {
      return genID;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export { userGenId };
