var getRandomBaseFunctions = require('../../js/lib/baseFunctions/getRandomBaseFunctions.js');

module.exports = () => {
  describe("getRandomBaseFunctions", () => {
    it("returns an object when called", () =>
    expect(getRandomBaseFunctions()).toEqual(jasmine.any(Object)));
    describe("var result = getRandomBaseFunctions(2, 8)", () => {
      var randomBaseFunctions;
      beforeEach(() => randomBaseFunctions = getRandomBaseFunctions(2, 8));
      describe("randomBaseFunctions.fns", () => {
        it("is an array", () =>
        expect(randomBaseFunctions.fns).toEqual(jasmine.any(Array)));
        it("is has length 8", () =>
        expect(randomBaseFunctions.fns.length).toEqual(8));
      });
      describe("randomBaseFunctions.names", () => {
        it("is an array", () =>
        expect(randomBaseFunctions.names).toEqual(jasmine.any(Array)));
        it("is has length 8", () =>
        expect(randomBaseFunctions.names.length).toEqual(8));
      });
      describe("randomBaseFunctions.dominances", () => {
        it("is an array", () =>
        expect(randomBaseFunctions.dominances).toEqual(jasmine.any(Array)));
        it("is has length 8", () =>
        expect(randomBaseFunctions.dominances.length).toEqual(8));
        it("all elements are numbers", () => {
          expect(randomBaseFunctions.dominances.every((element) =>
          typeof element === "number")).toEqual(true);
        });
      });
    });
  });
};
