const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../index");
const connectDB = require("../../db");
const { userMock, mockUsers, usersMock } = require("../../mocks/usersMocks");
const User = require("../../db/models/User");

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
      const title = "House near beaches";
      const description = "This is a description";
      const image = "abcd.jpeg";
      const address = "34 Llurai";
      const city = "Mongat";
      const placeType = "House";
      const price = 86;
      const numberOfRooms = 3;
      const numberOfBeds = 2;
      const numberOfGuests = 3;
      const creator = "629b88b726b95714b076c60a";
      const rating = 4.88;
      const isListed = true;
      const kilometers = 343;
      const category = "Nationall parks";

      const placeToCreate = {
        title,
        description,
        image,
        address,
        city,
        placeType,
        price,
        numberOfRooms,
        numberOfBeds,
        numberOfGuests,
        creator,
        rating,
        isListed,
        kilometers,
        category,
      };

      const {
        body: { token },
      } = await request(app)
        .post("/user/login")
        .send({
          username: "learningx",
          password: "abcd1234",
        })
        .expect(200);

      const { body: placeCreated } = await request(app)
        .post("/places")
        .set("Authorization", `Bearer ${token}`)
        .send(placeToCreate)
        .expect(201);

      expect(placeCreated).toHaveProperty("title", title);
      expect(placeCreated).toHaveProperty("description", description);
      expect(placeCreated).toHaveProperty("price", price);
      expect(placeCreated).toHaveProperty("numberOfGuests", numberOfGuests);
      expect(placeCreated).toHaveProperty("kilometers", kilometers);
    });
  });
});
