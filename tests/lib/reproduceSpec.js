var reproduce = require('../../js/lib/reproduction/sexual.js');
var Ghost = require('../../js/lib/Ghost/Ghost.js');
var computeFns = require('../../js/lib/Ghost/computeFns.js');

var GhostSpec = require('./GhostSpec.js');

module.exports = () => {
  describe("reproduce", () => {
    describe("var child = reproduce(Ghost(5, 8), Ghost(1, 9))", () => {
      var child;
      beforeEach(() => child = reproduce(Ghost(5, 8), Ghost(1, 9)));
      describe("chromosomes propery", () => {
        it("is an array of 2 objects", () => {
          expect(child.chromosomes).toEqual(jasmine.any(Array));
          expect(child.chromosomes.length).toBe(2);
          expect(child.chromosomes.every((elem) =>
            elem.constructor === Object)).toBe(true);
        });
        describe("chromosomes[0] and chromosomes[1]", () => {
          it("meet the chromosome spec as defined in Ghost \
            and are ordered by descending libs length", () => {
              expect(child.chromosomes).toEqual(jasmine.any(Object));
              expect(child.chromosomes[0].libs).toEqual(jasmine.any(Array));
              expect(child.chromosomes[0].libs.length).toBe(9);
              expect(child.chromosomes[0].libs.every((elem) =>
                elem.constructor === Object));
              expect(child.chromosomes[1].indices).toEqual(jasmine.any(Array));
              expect(child.chromosomes[1].indices.length).toBe(8);
              expect(child.chromosomes[1].indices.every((elem) =>
                elem.constructor === Number));
            });
        });
      });
    });
  });
};
