// pseudoclassical

/** @constructor */
function Shape(x, y) {
  this.x = x;
  this.y = y;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

/** @constructor */
function Rectangle(x1, y1, x2, y2) {
  Shape.call(this, (x1 + x2) / 2, (y1 + y2) / 2);
  this.x1 = x1; this.x2 = x2; this.y1 = y1; this.y2 = y2;
}

Rectangle.prototype = Object.create(Shape.prototype); // may poly

Rectangle.prototype.area = function () {
  return (this.x2 - this.x1) * (this.y2 - this.y1);
};

alert((new Rectangle(10, 10, 30, 20)).area());

/*
 * Object.create() polyfill
 */
if (!Object.create) {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('properties not implemented');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/*
 * "Functional"
 */
function Shape(x, y) {
  return {
    x: x,
    y: y,
    move: function (x, y) {
      this.x += x;
      this.y += y;
    }
  };
}

function Rectangle(x1, y1, x2, y2) {
  var self = Shape((x1 + x2) / 2, (y1 + y2) / 2);
  
  self.x1 = x1; self.x2 = x2; self.y1 = y1; self.y2 = y2;
  
  self.area = function () {
    return (self.x2 - self.x1) * (self.y2 - this.y1);  
  };
  
  return self;
}
