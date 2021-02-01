/* Integration Testing - Login */
import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";

// Main App and Create Context
import createApp from "../src/app";
import createContext from "../src/context";

// Test Utils
import shareLogin from "./util/login";

// Helpers
import * as ErrorHandler from "../src/helpers/errors/english.json";

let queryWithRealToken: any,
  mutateWithRealToken: any,
  queryWithFakeToken: any,
  mutateWithFakeToken: any;

// Header Data
let accessToken: string;

// Body Data
const My_Profile = {
  query: `{
  myProfile {
    user {
      _id,
      user_id
      username,
      add_username,
      display_name,
      email,
      birthdate,
      gender,
      bio
    },
    errors {
      __typename
      ... on Unauthentication {
          message
      },
      ... on ServerError {
          message
      }
    }
  }    
}`
};

const Update_My_Profile = {
  mutation: gql`
    mutation updateMyProfile($input: inputProfileUpdate) {
      updateMyProfile(input: $input) {
        user {
          _id
          user_id
          display_name
          birthdate
          gender
          bio
        }
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
    }
  `,
  variables: {
    input: {
      display_name: "Fname Lname",
      birthdate: "",
      gender: "Female",
      bio: ""
    }
  }
};

const Update_Username = {
  mutation: gql`
    mutation updateUsername($input: InputeUsernameUpdate) {
      updateUsername(input: $input) {
        user {
          _id
          user_id
          username
        }
        errors {
          __typename
          ... on Unauthentication {
            message
          }
          ... on ServerError {
            message
          }
          ... on DatabaseError {
            message
          }
        }
      }
    }
  `,
  variables: {
    input: {
      username: "test_username"
    }
  }
};

const User_Profile = {
  query: gql`
    query userProfile($username: String!) {
      userProfile(username: $username) {
        user {
          username
          display_name
          bio
        }
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
    }
  `,
  variables: { username: "test_username" }
};

describe("User", () => {
  beforeAll(async () => {
    // Get Token by Login
    const funwarnToken = await shareLogin();
    accessToken = funwarnToken.data.fbLogin.user.access_token;

    // Pass req/header to context, Real Token
    const reqWithRealToken = {
      headers: { authorization: `Bearer ${accessToken}` }
    };
    const contextWithRealToken = await createContext({ req: reqWithRealToken });
    // Pass req/header to context, Fake Token
    const reqWithFakeToken = {
      headers: { authorization: `Bearer 12345678` }
    };
    const contextWithFakeToken = await createContext({ req: reqWithFakeToken });

    // Pass context to app, Real Token
    const serverWithRealToken = createApp(contextWithRealToken);
    queryWithRealToken = createTestClient(serverWithRealToken).query;
    mutateWithRealToken = createTestClient(serverWithRealToken).mutate;
    // Pass context to app, Fake Token
    const serverWithFakeToken = createApp(contextWithFakeToken);
    queryWithFakeToken = createTestClient(serverWithFakeToken).query;
    mutateWithFakeToken = createTestClient(serverWithFakeToken).mutate;
  });

  test("Query User Profile with fake Access Token", async done => {
    const response = await queryWithFakeToken({ query: My_Profile.query });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.myProfile.errors).toMatchObject(
      ErrorHandler.InvalidToken.errors
    );
    return done();
  });

  test("Query User Profile", async done => {
    const response = await queryWithRealToken({ query: My_Profile.query });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.myProfile.user).toBeInstanceOf(Object);
    return done();
  });

  test("Mutation Update User Profile with fake Access Token", async done => {
    const response = await mutateWithFakeToken({
      mutation: Update_My_Profile.mutation,
      variables: Update_My_Profile.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.updateMyProfile.errors).toMatchObject(
      ErrorHandler.InvalidToken.errors
    );
    return done();
  });

  test("Mutation Update User Profile", async done => {
    const response = await mutateWithRealToken({
      mutation: Update_My_Profile.mutation,
      variables: Update_My_Profile.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.updateMyProfile.user).toBeInstanceOf(Object);
    return done();
  });

  test("Query User Profile by username that not exists", async done => {
    const response = await queryWithFakeToken({
      query: User_Profile.query,
      variables: User_Profile.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.userProfile.user).toBeNull();
    return done();
  });

  test("Mutation Update Username with fake Access Token", async done => {
    const response = await mutateWithFakeToken({
      mutation: Update_Username.mutation,
      variables: Update_Username.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.updateUsername.errors).toMatchObject(
      ErrorHandler.InvalidToken.errors
    );
    return done();
  });

  test("Mutation Update Username", async done => {
    const response = await mutateWithRealToken({
      mutation: Update_Username.mutation,
      variables: Update_Username.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.updateUsername.user).toBeInstanceOf(Object);
    return done();
  });

  test("Query User Profile by Username", async done => {
    const response = await queryWithFakeToken({
      query: User_Profile.query,
      variables: User_Profile.variables
    });

    // to remove [Object: null prototype] from each object
    const responseString = JSON.parse(JSON.stringify(response));
    expect(responseString.data.userProfile.user).toBeInstanceOf(Object);
    return done();
  });
});
