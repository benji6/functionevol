var computeFns = require('../../js/lib/Ghost/computeFns.js');

module.exports = () => {
  describe("computeFns", () =>
    it("is a function", () =>
      expect(computeFns).toEqual(jasmine.any(Function))));
};
