// array sort

var arr = [1, 3, 24, 29, 45, 51];
arr.sort(); // [1, 24, 29, 3, 45, 51]
arr.sort(function (x, y) {return x > y;}); // ok

// arraay delete

delete arr[2]; // [1, 3, undefined × 1, 29, 45, 51]
arr.splice(2, 1); // ok! [1, 3, 29, 45, 51]

// number conversion
+"08"; // ok (8)
+new Date; // .valueOF()
Number("08"); // same as +
parseInt("08"); // 0 why?
parseInt("ff", 16); // 256

// typeof
typeof array === "object"; // .isArray / instanceof (polyfill)
typeof null === "object"; // spec error :(
