const path = require("path");

const { getAllPlaces, createPlace } = require("./placesControllers");

const mockPlaces = require("../../../mocks/mockPlaces");
const Place = require("../../../db/models/Place");
const User = require("../../../db/models/User");

describe("Given a getAllPlaces middleware", () => {
  const req = {
    username: "LearningX",
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it's invoked with a valid token", () => {
    test("Then it should call the response's status method with status code 200 and json method with a list of places", async () => {
      const expectedStatus = 200;
      Place.find = jest.fn().mockResolvedValue(mockPlaces);

      await getAllPlaces(null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ places: mockPlaces });
    });
  });

  describe("When invoked with an invalid token", () => {
    test("Then it should call the next received function", async () => {
      const next = jest.fn();

      Place.find = jest.fn().mockRejectedValue({});
      await getAllPlaces(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createPlace controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest
    .spyOn(path, "join")
    .mockResolvedValueOnce("image")
    .mockReturnValueOnce(true)
    .mockResolvedValue(new Error());

  describe("When invoked with a new place with invalid data in the request", () => {
    test("Then it should call the next received function with an error 'Error while trying to create a place'", async () => {
      const req = {
        body: mockPlaces[0],
        file: {
          filename: "12794217722",
          originalname: "image.jpg",
        },
      };

      const expectedErrorMessage = "Error while trying to create a place";
      const next = jest.fn();

      const expectedError = new Error(expectedErrorMessage);

      Place.create = jest.fn().mockRejectedValue();

      await createPlace(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
