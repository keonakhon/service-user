/* Integration Testing - Login */
import { createTestClient } from "apollo-server-testing";

import createApp from "../src/app";
import { fbAccessTokenTestUser } from "./util/token";

// Helpers
import * as ErrorHandler from "../src/helpers/errors/english.json";

// Main App and Create Context
const server = createApp(null);
const { query } = createTestClient(server);

describe("Login", () => {
  let fbTokenWithEmail: string;
  let fbTokenWithoutEmail: string;
  beforeAll(async () => {
    // Read token from a file
    let fbTokenData = await fbAccessTokenTestUser();
    fbTokenWithEmail = fbTokenData?.fbTokenWithEmail;
    fbTokenWithoutEmail = fbTokenData?.fbTokenWithoutEmail;
  });

  test("login with facebook, must pass", async done => {
    const fbLogin = `{ 
      fbLogin(
        status: "connected", 
        authResponse: { accessToken: "${fbTokenWithEmail}", 
        expiresIn: "2", 
        signedRequest: "String", 
        userID: "String" } ) { 
          user { user_id, access_token, refresh_token }, 
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

    expect(responseString).toBeInstanceOf(Object);
    expect(responseString.data.fbLogin.user).toBeInstanceOf(Object);
    return done();
  });

  test("login with facebook by not provide email, must not pass", async done => {
    const fbLogin = `{ 
      fbLogin(
        status: "connected", 
        authResponse: { accessToken: "${fbTokenWithoutEmail}", 
        expiresIn: "2", 
        signedRequest: "String", 
        userID: "String" } ) { 
          user { user_id, access_token, refresh_token }, 
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
    expect(responseString.data.fbLogin.errors).toMatchObject(
      ErrorHandler.EmailIsRequired.errors
    );
    return done();
  });

  test("login with facebook by provide fake facebook's access token, must not pass", async done => {
    const fbLogin = `{ 
      fbLogin(
        status: "connected", 
        authResponse: { accessToken: ".${fbTokenWithEmail}", 
        expiresIn: "2", 
        signedRequest: "String", 
        userID: "String" } ) { 
          user { user_id, access_token, refresh_token }, 
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
    expect(responseString.data.fbLogin.errors).toMatchObject(
      ErrorHandler.SomethingWrong.errors
    );
    return done();
  });
});
