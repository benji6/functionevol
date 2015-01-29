var computeFns = require('../../js/lib/Ghost/computeFns.js');
var Ghost = require('../../js/lib/Ghost/Ghost.js');

module.exports = () => {
  describe("computeFns", () => {
    var fns;
    beforeEach(() => {
      var ghost = Ghost(1, 8);
      fns = computeFns(ghost);
    });
    it("takes a ghost as an argument and returns an array \
      of the functions which are computed from \
      reading the ghost's chromosomes",
      () => {
        expect(fns).toEqual(jasmine.any(Array));
        expect(fns.length).toBe(8);
        expect(fns.every((elem) =>
          elem.constructor === Function)).toBe(true);
      });
  });
};
