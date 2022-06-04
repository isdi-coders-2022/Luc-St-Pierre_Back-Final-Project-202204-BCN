const verify = require("jsonwebtoken/verify");
const auth = require("./auth");

const mockRequest = { id: 10 };

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockRequest,
}));

describe("Given an auth middleware function", () => {
  describe("When invoked with no token authorization", () => {
    test("Then the next function should be invoked with the error", () => {
      const req = {
        headers: {
          authorization: "",
        },
      };

      const expectedErrorMessage = "token missing";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      auth(req, null, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });
});
