const { getAllPlaces, deletePlace } = require("./placesControllers");

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

describe("Given a deletePlace controller", () => {
  const expectedStatus = 204;

  const req = {
    params: {
      placeId: 7,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a place id corresponding to an existing place in the database in the req params", () => {
    Place.findByIdAndDelete = jest.fn().mockResolvedValue(mockPlaces[0]);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's status method with 200", async () => {
      await deletePlace(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the deleted place", async () => {
      const expectedJsonResponse = mockPlaces[0];
      await deletePlace(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });
});
