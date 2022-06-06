const mockPlaces = require("../../mocks/usersMocks");
const { getAllPlaces } = require("./placeControllers");
const Place = require("../../db/models/Place");

describe("Given a createPlace middleware", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it's invoked with a place registration request with a place that doesn't exist with a response", () => {
    test("Then it should return the response status method with status code 201 and json method with a new place", async () => {
      Place.find = jest.fn().mockResolvedValue(mockPlaces);

      await getAllPlaces(null, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ places: mockPlaces });
    });
  });
});
