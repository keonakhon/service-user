/* User Resolver */
import axios from "axios";

// Provide resolver functions for your schema fields
interface FacebookLogin {
  status: string;
  authResponse: {
    accessToken: String;
    expiresIn: String;
    signedRequest: String;
    userID: String;
  };
}

const resolvers = {
  hello: () => "Hello world!",
  // Facebook Login
  fbLogin: async ({ status, authResponse }: FacebookLogin) => {
    try {
      if (status === "connected") {
        const userToken = authResponse.accessToken;

        // Inspect Token from facebook api
        const indpectorToken = await axios.get(
          `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${process.env.facebook_app_access_token}`
        );
        const userID = indpectorToken.data.data.user_id;

        // User Data from facebook api
        const userData = await axios.get(
          `https://graph.facebook.com/${userID}?fields=id,name&access_token=${userToken}`
        );

        return { status };
      }
    } catch (err) {
      // console.error(err);
    }
  }
};

export default resolvers;
