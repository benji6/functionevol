var getRandomBaseFunctions = require('../../js/lib/baseFunctions/getRandomBaseFunctions.js');

module.exports = () => {
  describe("getRandomBaseFunctions", () => {
    describe("var randomBaseFunctions = getRandomBaseFunctions(2, 8)", () => {
      var randomBaseFunctions;
      beforeEach(() => randomBaseFunctions = getRandomBaseFunctions(2, 8));
      describe("randomBaseFunctions.libs", () => {
        it("is an array of 8 objects", () => {
          expect(randomBaseFunctions.libs).toEqual(jasmine.any(Array));
          expect(randomBaseFunctions.libs.length).toBe(8);
          expect(randomBaseFunctions.libs.every((element) =>
            typeof element === "object")).toEqual(true);
        });
      });
      describe("randomBaseFunctions.indices", () => {
        it("is an array of 8 numbers", () => {
          expect(randomBaseFunctions.indices).toEqual(jasmine.any(Array));
          expect(randomBaseFunctions.indices.length).toBe(8);
          expect(randomBaseFunctions.indices.every((element) =>
            typeof element === "number")).toEqual(true);
        });
      });
    });
  });
};
