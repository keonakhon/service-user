/* User Resolver */
import AuthHelper from "../../helpers/auth";

// My User Profile
const MyProfile = async (_: any, __: any, context: any) => {
  try {
    // Authentication User
    const userData = await AuthHelper(context);
    if (!userData) {
      return {
        errors: [
          {
            __typename: "Unauthentication",
            message: "Invalid Token"
          }
        ]
      };
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
      username
    } = userData;

    return {
      user: {
        _id,
        username,
        add_username,
        display_name,
        email,
        birthdate,
        gender
      },
      errors: []
    };
  } catch (err) {}
};

export { MyProfile };
