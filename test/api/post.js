const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../app.js");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5YTlkNTA4Y2MzZWY3YTIxY2E3YyIsImlhdCI6MTY2NTQ0MDQxMywiZXhwIjoxNjY4MDMyNDEzfQ.zM9nT8RdiQqnIElrprISOq08s_4wBJsKJFgGSE2uRjg";

describe("POST", () => {
  let postId;
  it("OK, post success", (done) => {
    request(app)
      .post("/api/posts/")
      .set("Authorization", token)
      .send({ title: "A new post", description: "This is the description" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("post");
        postId = body.post.postId;
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post failed without title", (done) => {
    request(app)
      .post("/api/posts/")
      .set("Authorization", token)
      .send({ description: "This is the description" })
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post failed without description", (done) => {
    request(app)
      .post("/api/posts/")
      .set("Authorization", token)
      .send({ title: "A new post" })
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post deleted", (done) => {
    request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post deletion failed", (done) => {
    request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post like success", (done) => {
    request(app)
      .post("/api/like/634551b281803005663006ed")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post like failed", (done) => {
    request(app)
      .post("/api/like/634551b281803005663006ed")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post unlike success", (done) => {
    request(app)
      .post("/api/unlike/634551b281803005663006ed")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post unlike failed", (done) => {
    request(app)
      .post("/api/unlike/634551b281803005663006ed")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, post fetch success", (done) => {
    request(app)
      .get("/api/posts/634551b281803005663006ed")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).to.equals(200);
        done();
      })
      .catch((err) => done(err));
  });
});

it("OK, all posts fetch success", (done) => {
  request(app)
    .get("/api/all_posts")
    .set("Authorization", token)
    .then((res) => {
      expect(res.status).to.equals(200);
      done();
    })
    .catch((err) => done(err));
});
