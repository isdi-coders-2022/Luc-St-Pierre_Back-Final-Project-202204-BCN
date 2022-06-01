require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");
const { userMock } = require("../../mocks/usersMocks");
const { userRegister, userLogin } = require("./userControllers");

describe("Given a userRegister middleware", () => {
  describe("When it's invoked with a user registration request with a user that doesn't exist with a response", () => {
    test("Then it should call the response status method with status code 201 and json method with a new user without the pasword", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: {
          username: userMock.username,
          password: userMock.password,
          name: userMock.name,
          email: userMock.email,
          image: userMock.image,
        },
      };

      const next = jest.fn();

      const newUser = {
        username: userMock.username,
        name: userMock.name,
        email: userMock.email,
        image: userMock.image,
      };

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(newUser);

      await userRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });

  describe("When it's invoked with a request for a user that already exist with a response", () => {
    test("Then it should call the received next function with an error", async () => {
      const req = {
        body: {
          username: userMock.username,
          password: userMock.password,
          name: userMock.name,
          email: userMock.email,
          image: userMock.image,
        },
      };

      const next = jest.fn();

      const expectedError = new Error(
        `Username ${req.body.username} already exists!`
      );
      expectedError.code = 409;

      User.findOne = jest.fn().mockReturnValue(true);
      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a userLogin middleware", () => {
  describe("When its invoked with a request and a user with an invalid password", () => {
    test("Then it should call the received next function with a 'Password incorrect", async () => {
      const req = {
        body: { username: "LearningX", password: "Abceed1234" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();
      const expectedErrorMessage = "username or password invalid";

      User.findOne = jest.fn().mockResolvedValue(true);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      const expectedError = new Error(expectedErrorMessage);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked with a request and a user with the right credentials", () => {
    test("Then it should call the response's status method with status code 200 and the json method with a token", async () => {
      const req = {
        body: { username: "LearningX", password: "Abcd1234" },
      };

      const user = {
        name: "lucamino",
        username: "LearningX",
        password:
          "$2b$10$XuDQZZhWY/lJX3ILAyogne3NbbnjZKsyD98RDoyV1zaM78AJjtC6u",
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      const token = jwt.sign(user, process.env.JWT_SECRET);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(token),
      };

      await userLogin(req, res, () => null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
