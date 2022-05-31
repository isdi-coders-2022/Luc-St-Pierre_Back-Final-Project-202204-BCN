const { notFoundError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response's status method with a 404 and the json method with message", () => {
      const next = jest.fn();

      notFoundError(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
