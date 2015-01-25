var Ghost = require('../js/lib/Ghost/Ghost.js');
var getRandomBaseFunctions = require('../js/lib/baseFunctions/getRandomBaseFunctions.js');

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

describe("Ghost", () => {
  it("returns an object when called", () =>
    expect(Ghost(1, 8)).toEqual(jasmine.any(Object)));
  describe("var ghost = Ghost(1, 8)", () => {
    var ghost;
    beforeEach(() => ghost = Ghost(1, 8));
    describe("chromosomes propery", () => {
      it("is an array", () =>
        expect(ghost.chromosomes).toEqual(jasmine.any(Array)));
      it("of length 2", () =>
        expect(ghost.chromosomes.length).toEqual(2));
      describe("chromosomes[0]", () => {
        it("is an array", () =>
          expect(ghost.chromosomes[0]).toEqual(jasmine.any(Array)));
        it("of length 8", () =>
          expect(ghost.chromosomes[0].length).toEqual(8));
      });
      describe("chromosomes[1]", () => {
        it("is an array", () =>
          expect(ghost.chromosomes[1]).toEqual(jasmine.any(Array)));
        it("of length 8", () =>
          expect(ghost.chromosomes[1].length).toEqual(8));
      });
    });
    describe("dominances propery", () => {
      it("is an array", () =>
        expect(ghost.dominances).toEqual(jasmine.any(Array)));
      it("of length 2", () =>
        expect(ghost.dominances.length).toEqual(2));
      describe("dominances[0]", () => {
        it("is an array", () =>
          expect(ghost.dominances[0]).toEqual(jasmine.any(Array)));
        it("of length 8", () =>
          expect(ghost.dominances[0].length).toEqual(8));
      });
      describe("dominances[1]", () => {
        it("is an array", () =>
          expect(ghost.dominances[1]).toEqual(jasmine.any(Array)));
        it("of length 8", () =>
          expect(ghost.dominances[1].length).toEqual(8));
      });
    });
  });
});

var computeFns = require('../js/lib/Ghost/computeFns.js');
describe("computeFns", () =>
  it("is a function", () =>
    expect(computeFns).toEqual(jasmine.any(Function))));

var reproduce = require('../js/lib/reproduction/sexual.js');
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
