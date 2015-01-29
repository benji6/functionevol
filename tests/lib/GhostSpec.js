var Ghost = require('../../js/lib/Ghost/Ghost.js');

module.exports = () => {
  describe("Ghost", () => {
    describe("var ghost = Ghost(1, 8)", () => {
      var ghost;
      beforeEach(() => ghost = Ghost(5, 8));
      describe("chromosomes propery", () => {
        it("is an array of 2 objects", () => {
          expect(ghost.chromosomes).toEqual(jasmine.any(Array));
          expect(ghost.chromosomes.length).toBe(2);
          expect(ghost.chromosomes.every((elem) =>
            elem.constructor === Object)).toBe(true);
        });
        describe("chromosomes[0] and chromosomes[1]", () => {
          it("are objects with a libs property (array of 8 objects)\
            and an indices property (array of 8 numbers)", () => {
              expect(ghost.chromosomes).toEqual(jasmine.any(Object));
              expect(ghost.chromosomes[0].libs).toEqual(jasmine.any(Array));
              expect(ghost.chromosomes[0].libs.length).toBe(8);
              expect(ghost.chromosomes[0].libs.every((elem) =>
                elem.constructor === Object));
              expect(ghost.chromosomes[1].indices).toEqual(jasmine.any(Array));
              expect(ghost.chromosomes[1].indices.length).toBe(8);
              expect(ghost.chromosomes[1].indices.every((elem) =>
                elem.constructor === Number));
            });
        });
      });
    });
  });
};
