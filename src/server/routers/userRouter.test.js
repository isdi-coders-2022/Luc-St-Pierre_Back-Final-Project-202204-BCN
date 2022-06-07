const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../index");
const connectDB = require("../../db");
const { mockNewUsers } = require("../../mocks/usersMocks");
const User = require("../../db/models/User");

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  rename: jest.fn().mockReturnValue("1234image.jpg"),
}));

let database;

beforeAll(async () => {
  database = await MongoMemoryServer.create();
  await connectDB(database.getUri());
});

beforeEach(async () => {
  await User.create(mockNewUsers[0]);
  await User.create(mockNewUsers[1]);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await database.stop();
});

describe("Given a POST /user/register endpoint", () => {
  describe("When it receives a request with non existing user", () => {
    test("Then it should return with a response status code 201 with the new user created", async () => {
      const file = "file";

      const {
        body: {
          new_user: { username },
        },
      } = await request(app)
        .post("/user/register")
        .field("name", "lucamino")
        .field("username", "learningx")
        .field("password", "abcd1234")
        .field("email", "lucamino@gmail.com")
        .attach("image", Buffer.from(file, "utf-8"), {
          filename: "12798217782",
          originalname: "image.jpg",
        })
        .expect(201);

      expect(username).toBe("learningx");
    });
  });
});
