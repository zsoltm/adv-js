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

function identity(n) {
  return n;
}

function sum(fn) {
  return function (a, b) {
    var sum = 0, i;
    for (i = a; i <= b; i += 1) {
      sum += fn(i);
    }
    return sum;
  };
}

sumInts = sum(identity);
sumCubes = sum(cube);
sumFactorials = sum(factorial);

// equivalent to sumCubes
sum(cube)(3, 5);
// sum of the halves of integers between a and b
sum(function (n) { return Math.round(n / 2); })(3, 5);
