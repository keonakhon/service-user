/* Share Login Function */
import { createTestClient } from "apollo-server-testing";
import fs from "fs";

const fsPromises = fs.promises;

import createApp from "../../src/app";

// Main App and Create Context
const server = createApp(null);
const { query } = createTestClient(server);

const shareLogin = async () => {
  const fbTokenWithEmailFile =
    "__test__/util/static/facebook/token_w_email.txt";
  let facebookAccessToken = await fsPromises.readFile(
    fbTokenWithEmailFile,
    "utf-8"
  );

  const fbLogin = `{ 
    fbLogin(
      status: "connected", 
      authResponse: { accessToken: "${facebookAccessToken}", 
      expiresIn: "2", 
      signedRequest: "String", 
      userID: "String" } ) { 
        success
        user { user_id, access_token, refresh_token, display_name }, 
        errors {
          __typename
          ... on Unauthentication {
            message
          }
          ... on ServerError {
            message
          }
        }
      } 
    }`;
  const response = await query({ query: fbLogin });

  // to remove [Object: null prototype] from each object
  const responseString = JSON.parse(JSON.stringify(response));

  return responseString;
};

export default shareLogin;
