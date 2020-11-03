import supertest from "supertest";

import app from "../src/app";

const request = supertest(app);

describe("Service Endpoint", () => {
  afterEach(async () => {});

  test("login with facebook", async done => {
    let accessToken;
    request
      .post("/graphql")
      .send({
        query: `fbLogin(status: "connected", authResponse: { accessToken: ${accessToken}, expiresIn: "2", signedRequest: "String", userID: "String" } ) { user_id, access_token, refresh_token }`
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.users.length).toEqual(3);
        done();
      });
  });
});
