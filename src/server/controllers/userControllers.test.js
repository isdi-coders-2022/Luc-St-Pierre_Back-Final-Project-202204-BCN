const User = require("../../db/models/User");
const { userMock } = require("../../mocks/usersMocks");
const { userRegister } = require("./userControllers");

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
});
