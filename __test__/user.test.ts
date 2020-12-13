/* Integration Testing - User Service */
import { createTestClient } from "apollo-server-testing";

import app from "../src/app";
import { fbAccessTokenTestUser } from "./util/token";

const { query } = createTestClient(app);

describe("Service Endpoint", () => {
  let fbAccessToken: string;
  beforeEach(async () => {
    // Read token from a file
    fbAccessToken = await fbAccessTokenTestUser();
  });

  test("login with facebook", async done => {
    const FbLogin = `{ 
      FbLogin(
        status: "connected", 
        authResponse: { accessToken: "${fbAccessToken}", 
        expiresIn: "2", 
        signedRequest: "String", 
        userID: "String" } ) { 
          user { user_id, access_token, refresh_token }, 
          errors {
            __typename
            ... on LoginError {
              message
            }
            ... on ServerError {
              message
            }
          }
        } 
      }`;
    const response = await query({ query: FbLogin });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));

    expect(responseString).toBeInstanceOf(Object);
    expect(responseString.data.FbLogin.user).toBeInstanceOf(Object);
    return done();
  });
});
