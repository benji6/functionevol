var Ghost = require('../js/lib/Ghost/Ghost.js');
var getRandomBaseFunctions = require('../js/lib/baseFunctions/getRandomBaseFunctions.js');

describe("getRandomBaseFunctions", function () {
  it("returns an object when called", function () {
    expect(getRandomBaseFunctions()).toEqual(jasmine.any(Object));
  });
  describe("var result = getRandomBaseFunctions(2, 8)", function () {
    var randomBaseFunctions;
    beforeEach(function() {
      randomBaseFunctions = getRandomBaseFunctions(2, 8);
    });
    describe("randomBaseFunctions.fns", function () {
      it("is an array", function () {
        expect(randomBaseFunctions.fns).toEqual(jasmine.any(Array));
      });
      it("is has length 8", function () {
        expect(randomBaseFunctions.fns.length).toEqual(8);
      });
    });
    describe("randomBaseFunctions.names", function () {
      it("is an array", function () {
        expect(randomBaseFunctions.names).toEqual(jasmine.any(Array));
      });
      it("is has length 8", function () {
        expect(randomBaseFunctions.names.length).toEqual(8);
      });
    });
    describe("randomBaseFunctions.dominances", function () {
      it("is an array", function () {
        expect(randomBaseFunctions.dominances).toEqual(jasmine.any(Array));
      });
      it("is has length 8", function () {
        expect(randomBaseFunctions.dominances.length).toEqual(8);
      });
      it("all elements are numbers", function () {
        expect(randomBaseFunctions.dominances.every(function (element) {
          return typeof element === "number";
        })).toEqual(true);
      });
    });

  });
});

describe("Ghost", function () {
  it("returns an object when called", function () {
    expect(Ghost(1, 8)).toEqual(jasmine.any(Object));
  });
  describe("var ghost = Ghost(1, 8)", function () {
    var ghost;
    beforeEach(function() {
      ghost = Ghost(1, 8);
    });
    describe("chromosomes propery", function () {
      it("is an array", function () {
        expect(ghost.chromosomes).toEqual(jasmine.any(Array));
      });
      it("of length 2", function () {
        expect(ghost.chromosomes.length).toEqual(2);
      });
      describe("chromosomes[0]", function () {
        it("is an array", function () {
          expect(ghost.chromosomes[0]).toEqual(jasmine.any(Array));
        });
        it("of length 8", function () {
          expect(ghost.chromosomes[0].length).toEqual(8);
        });
      });
      describe("chromosomes[1]", function () {
        it("is an array", function () {
          expect(ghost.chromosomes[1]).toEqual(jasmine.any(Array));
        });
        it("of length 8", function () {
          expect(ghost.chromosomes[1].length).toEqual(8);
        });
      });
    });
    describe("dominances propery", function () {
      it("is an array", function () {
        expect(ghost.dominances).toEqual(jasmine.any(Array));
      });
      it("of length 2", function () {
        expect(ghost.dominances.length).toEqual(2);
      });
      describe("dominances[0]", function () {
        it("is an array", function () {
          expect(ghost.dominances[0]).toEqual(jasmine.any(Array));
        });
        it("of length 8", function () {
          expect(ghost.dominances[0].length).toEqual(8);
        });
      });
      describe("dominances[1]", function () {
        it("is an array", function () {
          expect(ghost.dominances[1]).toEqual(jasmine.any(Array));
        });
        it("of length 8", function () {
          expect(ghost.dominances[1].length).toEqual(8);
        });
      });
    });
  });
});
