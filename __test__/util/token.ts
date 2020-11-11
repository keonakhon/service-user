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
    const fileName = "__test__/util/static/facebook_token.txt";

    // Read token from a file
    let facebookAccessToken = await fsPromises.readFile(fileName, "utf-8");

    // Extend Facebook Access Token Long-Live
    const longLiveAcessToken = await axios.get(
      `${fbGraphQLURL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appID}&client_secret=${appSecret}&fb_exchange_token=${facebookAccessToken}`
    );

    const newLongLivedAccessToken = longLiveAcessToken.data.access_token;

    // Update new token to a file
    await fsPromises.writeFile(fileName, newLongLivedAccessToken);

    return newLongLivedAccessToken;
  } catch (err) {
    // console.error(err);
  }
};

export { fbAccessTokenTestUser };
