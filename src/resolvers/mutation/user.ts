/* Mutation - User Resolver */
// Models
import UserModel from "../../models/user";

// Helpers
import AuthHelper from "../../helpers/auth";
import * as ErrorHandler from "../../helpers/errors/english.json";

interface InputInterface {
  input: {
    username: string;
    display_name: string;
    email: string;
    birthdate: string;
    gender: string;
  };
}

interface BodyDataInterface {
  display_name?: string;
  birthdate?: string;
  gender?: string;
}

// Update User Profile
const updateMyProfile = async (
  _: any,
  { input }: InputInterface,
  context: any
) => {
  try {
    // Authentication User
    const userData = await AuthHelper(context);
    if (!userData) {
      return ErrorHandler.LoginError;
    }

    // User Data
    const { _id } = userData;

    // Inputs
    const { display_name, birthdate, gender } = input;

    // Update specified data
    let bodyData: BodyDataInterface = {};
    if (display_name) {
      bodyData.display_name = display_name;
    }
    if (birthdate) {
      bodyData.birthdate = birthdate;
    }
    if (gender) {
      bodyData.gender = gender;
    }

    // Update User Data
    const userDataUpdated: any = await UserModel.findOneAndUpdate(
      { _id },
      { $set: bodyData },
      { new: true }
    );

    return {
      user: {
        display_name: userDataUpdated.display_name,
        birthdate: userDataUpdated.birthdate,
        gender: userDataUpdated.gender
      },
      errors: []
    };
  } catch (err) {
    return ErrorHandler.SomethingWrong;
  }
};

export { updateMyProfile };
