/** @fileOverview JS version of scala course examples */

function factorial(n) {
  var i, f = 1;
  for (i = 2; i <= n; i += 1) {
    f *= i;
  }
  return f;
}

function cube(n) {
  return Math.pow(n, 3);
}

function sum(fn, a, b) {
  var sum = 0, i;
  for (i = a; i <= b; i += 1) {
    sum += fn(i);
  }
  return sum;
}

function identity(n) { return n; }
sumInts = function (a, b) { return sum(identity, a, b); };
sumCubes = function (a, b) { return sum(cube, a, b); };
sumFactorials = function (a, b) { return sum(factorial, a, b); };
