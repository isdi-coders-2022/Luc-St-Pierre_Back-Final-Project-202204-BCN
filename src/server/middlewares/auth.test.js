const jwt = require("jsonwebtoken");
const auth = require("./auth");

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

  describe("When invoked with a valid token", () => {
    test("Then the next function should be invoked with the error", () => {
      const req = {
        headers: {
          authorization: "Bearer 498s83sldfh4",
        },
      };

      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue({ id: 10 });

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("userId", 10);
    });
  });
});
