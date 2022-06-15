const Place = require("../../../db/models/Place");
const mockPlaces = require("../../../mocks/mockPlaces");
const getPlaceById = require("./placeController");

describe("Given a getPlaceById middleware", () => {
  const req = {
    params: {
      placeId: "1",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a valid token and an existing place id in the request params", () => {
    test("Then it should call the response's status method with 200 and the json method with the data of the place", async () => {
      const expectedStatus = 200;
      const expectedJsonResponse = { placeDetail: mockPlaces[0] };

      Place.findById = jest.fn().mockResolvedValue(mockPlaces[0]);

      await getPlaceById(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When invoked with a valid token and a place id that doesn't exist in the request params", () => {
    test("Then it should call the response's status method with 200 and the json method with the data of the place", async () => {
      const expectedErrorMessage = "Place Id not found";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      Place.findById = jest.fn().mockResolvedValue(mockPlaces[0]);

      await getPlaceById(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
