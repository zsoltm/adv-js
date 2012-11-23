/**
 * @fileOverview Particles with "Power-Constructor" OO design pattern.
 */

var Vector = function (x, y) {
  return {
    x: x || 0,

    y: y || 0,

    sAdd: function (v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    },

    sSub: function (v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    },

    add: function (vector) {
      this.x += vector.x;
      this.y += vector.y;
    },

    sub: function (vector) {
      this.x -= vector.x;
      this.y -= vector.y;
    },

    mult: function (number) {
      this.x *= number;
      this.y *= number;
    },

    div: function (n) {
      this.x /= n;
      this.y /= n;
    },

    mag: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalize: function () {
      m = this.mag();
      if (m !== 0) {
          this.div(m);
      }
      return this;
    },

    limit: function (max) {
      if (this.mag() > max) {
        this.normalize();
        this.mult(max);
      }
    }
  };
};

var Particle = function () {

  var _velocity = new Vector();
  var _force = new Vector();

  this.position = new Vector();
  this.radius = 3;

  this.addForce = function (vector) {
    _force.x += vector.x;
    _force.y += vector.y;
    return this;
  };

  this.reset = function () {
    _force.x = 0;
    _force.y = 0;
  };

  this.addRandomness = function () {
    this.position.x += -1 + Math.random() * 2;
    this.position.y += -1 + Math.random() * 2;
  };

  this.update = function () {
    _velocity.add(_force);
    _velocity.limit(15);
    
    this.position.add(_velocity);
    this.addRandomness();
    this.reset();

    if (this.position.x + this.radius * 0.5 >= window.innerWidth) {
      _velocity.x *= -1;
    }

    if (this.position.y + this.radius * 0.5 >= window.innerHeight) {
      _velocity.y *= -1;
    }

    if (this.position.x + this.radius * 0.5 <= 0) {
      _velocity.x *= -1;
    }

    if (this.position.y + this.radius * 0.5 <= 0) {
      _velocity.y *= -1;
    }
    
    return this;
  };
  
  this.paint = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
};
