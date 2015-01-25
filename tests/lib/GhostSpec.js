var Ghost = require('../../js/lib/Ghost/Ghost.js');

module.exports = () => {
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
};
