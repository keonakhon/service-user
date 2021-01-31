/* Query - User Resolver */
// Helpers
import AuthHelper from "../../helpers/auth";
import * as ErrorHandler from "../../helpers/errors/english.json";

// My User Profile
const myProfile = async (_: any, __: any, context: any) => {
  try {
    // Authentication User
    const userData = await AuthHelper(context);
    if (!userData) {
      return ErrorHandler.InvalidToken;
    }

    // User Data
    const {
      _id,
      add_username,
      display_name,
      banned_id,
      birthdate,
      gender,
      email,
      username,
      gen_id
    } = userData;

    return {
      user: {
        _id,
        username,
        add_username,
        display_name,
        email,
        birthdate,
        gender,
        user_id: gen_id
      },
      errors: []
    };
  } catch (err) {
    return ErrorHandler.SomethingWrong;
  }
};

export { myProfile };
