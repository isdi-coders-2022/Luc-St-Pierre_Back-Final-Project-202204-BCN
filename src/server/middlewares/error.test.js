const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response's status method with a 404 and the json method with message", () => {
      const next = jest.fn();

      notFoundError(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the response's method with a status code of 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        statusCode: 500,
        message: "General error",
      };

      const expectedStatusCode = 500;
      const expectedMessage = { error: true, message: "General error" };

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toBeCalledWith(expectedMessage);
    });
  });
});
