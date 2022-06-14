const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("../../index");
const connectDB = require("../../../db");
const User = require("../../../db/models/User");
// const { userMock } = require("../../../mocks/usersMocks");

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

// describe("Given a POST /user/register endpoint", () => {
//   describe("When it receives a request with non existing user", () => {
//     test("Then it should return with a response status code 201 with the new user created", async () => {
//       const { body } = await request(app)
//         .post("/user/register")
//         .type("multipart/form-data")
//         .field("name", userMock.name)
//         .field("username", userMock.username)
//         .field("password", userMock.password)
//         .field("email", userMock.email)
//         .attach("image", Buffer.from("mockImageString", "utf-8"), {
//           filename: "mockImage",
//           originalname: "image.jpg",
//         })
//         .expect(201);

//       expect(body).toHaveProperty("username", userMock.username);
//     });
//   });
// });
