/* Oauth Access Token */
import fs from "fs";
import axios from "axios";

const fsPromises = fs.promises;

// Facebook Access Token for Test User
const fbAccessTokenTestUser = async () => {
  try {
    const fbGraphQLURL = "https://graph.facebook.com";
    let appID = process.env.facebook_app_id;
    let appSecret = process.env.facebook_app_secret;
    const fbTokenWithEmailFile =
      "__test__/util/static/facebook/token_w_email.txt";
    const fbTokenWithoutEmailFile =
      "__test__/util/static/facebook/token_wo_email.txt";

    // Extend Token Live
    const extendTokenLive = async (fileName: string) => {
      // Read token data from txt file name
      let facebookAccessToken = await fsPromises.readFile(fileName, "utf-8");

      // Extend Facebook Access Token Long-Live
      const extendedTokenLive = await axios.get(
        `${fbGraphQLURL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appID}&client_secret=${appSecret}&fb_exchange_token=${facebookAccessToken}`
      );

      const longLivedTokenData = extendedTokenLive.data.access_token;

      // Update new token to a file
      await fsPromises.writeFile(fileName, longLivedTokenData);

      return longLivedTokenData;
    };

    // Extended token data
    const fbTokenWithEmail = await extendTokenLive(fbTokenWithEmailFile);
    const fbTokenWithoutEmail = await extendTokenLive(fbTokenWithoutEmailFile);

    return { fbTokenWithEmail, fbTokenWithoutEmail };
  } catch (err) {
    console.error(err);
  }
};

export { fbAccessTokenTestUser };
