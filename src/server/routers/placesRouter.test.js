const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../index");
const connectDB = require("../../db");
const { usersMock } = require("../../mocks/usersMocks");
const User = require("../../db/models/User");
const mockPlaces = require("../../mocks/mockPlaces");

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("thing"),
  uploadBytes: jest.fn().mockResolvedValue(),
  getStorage: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

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
  await request(app)
    .post("/user/register")
    .type("multipart/form-data")
    .field("name", "lucamino")
    .field("username", "learningx")
    .field("password", "abcd1234")
    .field("email", "lucamino@gmail.com")
    .attach("image", Buffer.from("mockImageString", "utf-8"), {
      filename: "mockImage",
      originalname: "image.jpg",
    })
    .expect(201);

  await request(app)
    .post("/user/register")
    .type("multipart/form-data")
    .field("name", "vero")
    .field("username", "vera")
    .field("password", "abcd1234")
    .field("email", "vero@gmail.com")
    .attach("image", Buffer.from("mockImageString", "utf-8"), {
      filename: "mockImage",
      originalname: "image.jpg",
    })
    .expect(201);
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST /places endpoint", () => {
  describe("When it receives a request for creating a new place with a valid token", () => {
    test("Then it should return with a response status code 201 with the new places created", async () => {
      const placeToCreate = mockPlaces[0];

      const {
        body: { token },
      } = await request(app)
        .post("/user/login")
        .send({
          username: usersMock[0].username,
          password: usersMock[0].password,
        })
        .expect(200);

      const { body: placeCreated } = await request(app)
        .post("/places")
        .set("Authorization", `Bearer ${token}`)
        .send(placeToCreate)
        .expect(201);

      expect(placeCreated).toHaveProperty("title", placeToCreate.title);
      expect(placeCreated).toHaveProperty(
        "description",
        placeToCreate.description
      );
      expect(placeCreated).toHaveProperty("price", placeToCreate.price);
      expect(placeCreated).toHaveProperty(
        "numberOfGuests",
        placeToCreate.numberOfGuests
      );
      expect(placeCreated).toHaveProperty(
        "kilometers",
        placeToCreate.kilometers
      );
    });
  });
});
