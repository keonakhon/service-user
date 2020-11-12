/* Integration Testing - User Service */
import supertest from "supertest";

import app from "../src/app";
import { fbAccessTokenTestUser } from "./util/token";

const request = supertest(app);

describe("Service Endpoint", () => {
  let fbAccessToken: string;
  beforeEach(async () => {
    // Read token from a file
    fbAccessToken = await fbAccessTokenTestUser();
  });

  test("login with facebook", async done => {
    return await request
      .post("/graphql")
      .send({
        query: `{ fbLogin( status: "connected", authResponse: { accessToken: "${fbAccessToken}", expiresIn: "2", signedRequest: "String", userID: "String" } ) { user_id, access_token, refresh_token } }`
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.fbLogin).toBeInstanceOf(Object);
        return done();
      });
  });
});
