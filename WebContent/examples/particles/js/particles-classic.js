/**
 * @fileOverview Particles implemented with "Pseudo-Classical" OO design pattern.
 */

/**
 * Vector
 * @constructor
 */
var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector.prototype = {
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



/**
 * Particle
 * @constructor
 */
var Particle = function () {
    this._velocity = new Vector();
    this._force = new Vector();
    this.position = new Vector();
    this.radius = 3;
};

Particle.prototype = {
    addForce: function (vector) {
        this._force.x += vector.x;
        this._force.y += vector.y;
        return this;
    },
    
    reset: function () {
        this._force.x = 0;
        this._force.y = 0;
    },
    
    addRandomness: function () {
        this.position.x += -1 + Math.random() * 2;
        this.position.y += -1 + Math.random() * 2;
    },
    
    update: function () {
        this._velocity.add(this._force);
        this._velocity.limit(15);
        this.position.add(this._velocity);

        this.addRandomness();

        this.reset();

        if (this.position.x + this.radius * 0.5 >= window.innerWidth) {
            this._velocity.x *= -1;
        }

        if (this.position.y + this.radius * 0.5 >= window.innerHeight) {
            this._velocity.y *= -1;
        }

        if (this.position.x + this.radius * 0.5 <= 0) {
            this._velocity.x *= -1;
        }

        if (this.position.y + this.radius * 0.5 <= 0) {
            this._velocity.y *= -1;
        }
        
        return this;
    },
    
    paint: function (ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
};
