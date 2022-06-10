const { getAllPlaces } = require("./placeControllers");

const mockPlaces = require("../../../mocks/mockPlaces");
const Place = require("../../../db/models/Place");

describe("Given a createPlace middleware", () => {
  const req = {
    username: "LearningX",
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it's invoked with a valide token", () => {
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
