/** @fileOverview JS version of scala course examples */

// sum of integers between a and b

function sumInts(a, b) {
  var sum = 0, i;
  for (i = a; i <= b; i += 1) {
    sum += i;
  }
  return sum;
}

function cube(n) {
  return Math.pow(n, 3);
}

function sumCubes(a, b) {
  var sum = 0, i;
  for (i = a; i <= b; i += 1) {
    sum += cube(i);
  }
  return sum;
}

function factorial(n) {
  var i, f = 1;
  for (i = 2; i <= n; i += 1) {
    f *= i;
  }
  return f;
}

function sumFactorials(a, b) {
  var sum = 0, i;
  for (i = a; i <= b; i += 1) {
    sum += factorial(i);
  }
  return sum;
}
