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
      const userToken =
        "EAAIqZCPH6Yj4BAKtWUMsbaUrGIR5crYSkGSmy1bvJ2xCxVSM5vNmM7kxKrilLl8FZB5SqYAVzqlj0j16R26jyTbDv2GZCsgmg40fpc3FSdTVZAnMYlnNFZBKMecUiiNG0T3Mvt5z1f9LtoZBJHvr52EUBqdb0HDcf85r85JYFfHsgCy9JMiTyu3ZCUDY0EWZCp9gL585NzmgCAZDZD";

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
    } catch (err) {
      // console.error(err);
    }
  }
};

export default resolvers;
