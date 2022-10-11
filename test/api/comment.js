const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../app.js");

describe("COMMENT", () => {
  it("OK, comment success", (done) => {
    request(app)
      .post("/api/comment/634551b281803005663006ed")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .send({ text: "This comment was done from unit test" })
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, comment failed without text", (done) => {
    request(app)
      .post("/api/comment/634551b281803005663006ed")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .send({})
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, comment failed without postID", (done) => {
    request(app)
      .post("/api/comment/")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg"
      )
      .send({ text: "This comment was done from unit test" })
      .then((res) => {
        expect(res.status).to.not.equals(200);
        done();
      })
      .catch((err) => done(err));
  });
});
