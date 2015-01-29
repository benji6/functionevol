var getRandomBaseFunctions = require('../../js/lib/baseFunctions/getRandomBaseFunctions.js');

module.exports = () => {
  describe("getRandomBaseFunctions", () => {
    describe("var result = getRandomBaseFunctions(2, 8)", () => {
      var randomBaseFunctions;
      beforeEach(() => randomBaseFunctions = getRandomBaseFunctions(2, 8));
      describe("randomBaseFunctions.fns", () => {
        it("is an array of 8 functions", () => {
          expect(randomBaseFunctions.fns).toEqual(jasmine.any(Array));
          expect(randomBaseFunctions.fns.length).toBe(8);
          expect(randomBaseFunctions.fns.every((element) =>
            typeof element === "function")).toEqual(true);
        });
      });
      describe("randomBaseFunctions.names", () => {
        it("is an array of 8 strings", () => {
          expect(randomBaseFunctions.names).toEqual(jasmine.any(Array));
          expect(randomBaseFunctions.names.length).toBe(8);
          expect(randomBaseFunctions.names.every((element) =>
            typeof element === "string")).toEqual(true);
        });
      });
      describe("randomBaseFunctions.dominances", () => {
        it("is an array of 8 numbers", () => {
          expect(randomBaseFunctions.dominances).toEqual(jasmine.any(Array));
          expect(randomBaseFunctions.dominances.length).toEqual(8);
          expect(randomBaseFunctions.dominances.every((element) =>
            typeof element === "number")).toEqual(true);
        });
      });
    });
  });
};
