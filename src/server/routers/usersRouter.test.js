const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../index");
const connectDB = require("../../db");
const { usersMock, userMock } = require("../../mocks/usersMocks");
const User = require("../../db/models/User");

let database;

beforeAll(async () => {
  database = await MongoMemoryServer.create();
  await connectDB(database.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await database.stop();
});

beforeEach(async () => {
  await request(app).post("/users/register").send(usersMock[0]).expect(201);
  await request(app).post("/users/register").send(usersMock[1]).expect(201);
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST /users/register endpoint", () => {
  describe("When it receives a request with non existing user", () => {
    test("Then it should return with a response status code 201 with the new user created", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send(userMock)
        .expect(201);

      expect(body).toHaveProperty("username", userMock.username);
    });
  });
});