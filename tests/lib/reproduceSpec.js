var reproduce = require('../../js/lib/reproduction/sexual.js');
var Ghost = require('../../js/lib/Ghost/Ghost.js');
var computeFns = require('../../js/lib/Ghost/computeFns.js');

module.exports = () => {
  describe("reproduce", () => {
    it("is a function", () =>
    expect(reproduce).toEqual(jasmine.any(Function)));
    describe("reproduce(Ghost(5, 6), Ghost(5, 6))", () => {
      it("returns an object", () =>
      expect(reproduce(Ghost(5, 6), Ghost(5, 6))).toEqual(jasmine.any(Object)));
      describe("var child = reproduce(Ghost(1, 9), Ghost(5, 8))", () => {
        var child = reproduce(Ghost(1, 9), Ghost(5, 8));
        describe("chromosomes", () => {
          it("is an array", () =>
          expect(child.chromosomes).toEqual(jasmine.any(Array)));
          it("has length 2", () =>
          expect(child.chromosomes.length).toEqual(2));
        });
        describe("computeFns(child)", () => {
          computeFns(child);
          it("is an object", () =>
          expect(child).toEqual(jasmine.any(Object)));
          describe("child.fns", () => {
            it("is an array", () =>
            expect(child.fns).toEqual(jasmine.any(Array)));
            it("of length 9", () =>
            expect(child.fns.length).toEqual(9));
            it("all elements are functions", () =>
            expect(child.fns.every((element) =>
            typeof element === "function")).toEqual(true));
            console.log(child);
          });
        });
      });
    });
  });
};
