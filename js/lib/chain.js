module.exports = function chain (fns) {
  return function (x, i) {
    i = i || 0;
    var fn;
    var binaryReturnFn = function (y) {
      return chain(fns)(fn(x, y), ++i);
    };
    while (i < fns.length) {
      fn = fns[i];
      if (fn.length === 2) {
        return binaryReturnFn;
      }
      x = fn(x);
      i++;
    }
    return x;
  };
};
