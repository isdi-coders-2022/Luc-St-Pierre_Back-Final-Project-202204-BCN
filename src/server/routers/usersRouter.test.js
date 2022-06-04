const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../index");
const connectDB = require("../../db");
const {
  usersMock,
  userMock,
  userMockCredentials,
} = require("../../mocks/usersMocks");
const User = require("../../db/models/User");

let database;

beforeAll(async () => {
  database = await MongoMemoryServer.create();
  await connectDB(database.getUri());
});

beforeEach(async () => {
  await User.create(usersMock[0]);
  await User.create(usersMock[1]);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await database.stop();
});

describe("Given a POST /users/register endpoint", () => {
  describe("When it receives a request with non existing user", () => {
    test("Then it should return with a response status code 201 with the new user created", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send({
          username: userMock.username,
          password: userMock.password,
          email: userMock.email,
          name: userMock.name,
        })
        .expect(201);

      expect(body).toHaveProperty("username", userMock.username);
    });
  });
});

describe("Given a POST /users/login endpoint", () => {
  describe("When it receives a request with an existing user", () => {
    test("Then it should return with a response status code 200 with a token", async () => {
      await request(app)
        .post("/users/register")
        .send({
          username: userMock.username,
          password: userMock.password,
          email: userMock.email,
          name: userMock.name,
        })
        .expect(201);

      const { body } = await request(app)
        .post("/users/login")
        .send(userMockCredentials)
        .expect(200);

      expect(body.token).not.toBeNull();
    });
  });
});
