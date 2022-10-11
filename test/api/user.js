const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../app.js");

describe("USER", () => {
  it("OK, login success", (done) => {
    request(app)
      .post("/api/authenticate")
      .send({ email: "xbn@mnx.com", password: "qwerty" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("token");
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, login failed", (done) => {
    request(app)
      .post("/api/authenticate")
      .send({ email: "xbn@mnx.com" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("error");
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, follow success", (done) => {
    request(app)
      .post("/api/follow/63449a98508cc3ef7a21ca79")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, follow failed", (done) => {
    request(app)
      .post("/api/follow/63449a98508cc3ef7a21ca79")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, unfollow success", (done) => {
    request(app)
      .post("/api/unfollow/63449a98508cc3ef7a21ca79")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, unfollow failed", (done) => {
    request(app)
      .post("/api/unfollow/63449a98508cc3ef7a21ca79")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, fetching profile success", (done) => {
    request(app)
      .get("/api/user")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .then((res) => {
        expect(res.status).to.equals(200);
        expect(res.body).to.contain.property("user");
        done();
      })
      .catch((err) => done(err));
  });
});
