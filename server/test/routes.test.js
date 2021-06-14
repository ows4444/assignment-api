const fs = require("fs");
const path = require("path");
const request = require("supertest");
const app = require("../../app");
describe("Get Endpoints", () => {
  it("should get Users", async () => {
    const res = await request(app).get("/api/user").send();
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get Films", async () => {
    const res = await request(app).get("/api/film").send();
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should get one Film", async () => {
    const res = await request(app).get("/api/film/1").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(1);
  });
  it("should get Film 1 comments", async () => {
    const res = await request(app).get("/api/film/1/comment").send();
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Post Endpoints", (done) => {
  it("should receive Error sign Up User", async () => {
    let user = {};
    const res = await request(app).post("/api/user").send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body.title).toBe("User Registration Failed!");
  });

  it("should Save User and Email loweredCase", async () => {
    let user = {
      password: "password",
      name: "Test User",
      email: "test@Dem3.com",
    };
    const res = await request(app).post("/api/user").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toBe("test@dem3.com");
  });

  it("should receive Error sign Up User Email Exists", async () => {
    let user = {
      password: "password",
      name: "Test User",
      email: "test@Dem3.com",
    };
    const res = await request(app).post("/api/user").send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.email.msg).toBe("E-mail already in use");
  });

  it("should receive Error film create", async () => {
    let film = {};
    const res = await request(app).post("/api/film").send(film);
    expect(res.statusCode).toEqual(400);
    expect(res.body.title).toBe("Film Creating Failed!");
  });

  it("should success film create", async () => {
    const res = await request(app)
      .post("/api/film")
      .attach("photo", path.resolve("uploads\\film.png"))
      .field("name", "Film Name")
      .field("description", "Film description")
      .field("releaseDate", "2020-12-11")
      .field("rating", 3)
      .field("ticketPrice", 900)
      .field("country", "Pakistan")
      .field("genre", ["funny", "action"]);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("Film Name");
  });
});
