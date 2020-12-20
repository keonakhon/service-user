/* Mutation - User Resolver */
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

    // Inputs
    const { username, display_name, birthdate, gender } = input;
    if (username) {
      console.log(username);
    } else {
      console.log("username empty");
    }
    return { errors: [] };
  } catch (err) {
    return ErrorHandler.SomethingWrong;
  }
};

export { updateMyProfile };
