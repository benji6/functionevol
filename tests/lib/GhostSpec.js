var Ghost = require('../../js/lib/Ghost/Ghost.js');

module.exports = () => {
  describe("Ghost", () => {
    describe("var ghost = Ghost(1, 8)", () => {
      var ghost;
      beforeEach(() => ghost = Ghost(1, 8));
      describe("chromosomes propery", () => {
        it("is an array of 2 arrays", () => {
          expect(ghost.chromosomes).toEqual(jasmine.any(Array));
          expect(ghost.chromosomes.length).toBe(2);
          expect(ghost.chromosomes.every((elem) =>
            elem.constructor === Array)).toBe(true);
        });
        describe("chromosomes[0]", () => {
          it("is an array of 8 objects,\
            each with a libs (object) and and indices (number) property", () => {
              expect(ghost.chromosomes[0]).toEqual(jasmine.any(Array));
              expect(ghost.chromosomes[0].length).toEqual(8);
              expect(ghost.chromosomes.every((elem) =>
                elem.constructor === Object &&
                  elem.libs.constructor === Object &&
                  elem.indices === "string")).toBe(true);
            });
        });
        describe("chromosomes[1]", () => {
          it("is an array of 8 objects,\
            each with a libs (object) and and indices (number) property", () => {
              expect(ghost.chromosomes[1]).toEqual(jasmine.any(Array));
              expect(ghost.chromosomes[1].length).toEqual(8);
              expect(ghost.chromosomes.every((elem) =>
                elem.constructor === Object &&
                  elem.libs.constructor === Object &&
                  elem.indices === "string")).toBe(true);
            });
        });
      });
    });
  });
};
