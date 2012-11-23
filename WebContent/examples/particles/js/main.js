// Application
var Application = (function () {

    var TOTAL_PARTICLES = 50;
    var WINDOW_WIDTH = 0;
    var WINDOW_HEIGHT = 0;

    var _canvas;
    var _fpsLabel;
    var fpsCollected_ = [];
    var _context = undefined;
    var _paramsForm = undefined;
    var particlesField_ = undefined;
    var sVector = new Vector();
    var lastFrameTime = undefined;
    var lastFpsDisplayTime = undefined;
    var _mouse = new Vector();

    var _particles = [];
    var _self = null;

    var _acceleration = new Vector(-1, 1);

    return {

        init: function () {
            _self = this;

            //Get canvas
            _canvas = document.getElementById('world');
            _fpsLabel = document.getElementById('fps');
            _paramsForm = document.getElementById('params');
            particlesField_ = document.getElementById("particles");
            _context = _canvas.getContext('2d');

            if (_context) {
                this._resize();

                _mouse.x = WINDOW_WIDTH * 0.5;
                _mouse.y = WINDOW_HEIGHT * 0.5;

                this._createParticles(TOTAL_PARTICLES);
                particlesField_.value = _particles.length;
                this._addEventListeners();
                window.requestAnimationFrame(this._draw);
            }
        },

        _addEventListeners: function () {
            evt.on(window, 'resize', this._resize);
            evt.on(document.body, 'mousemove', this._onMouseMove);
            evt.on(_paramsForm, "submit", this._onParamsSubmit);
        },

        _createParticles: function (num) {
            var i;
            var particle;

            for (i = num; i > 0; i -= 1) {
                particle = new Particle();
                particle.position.x = Math.floor(Math.random() * WINDOW_WIDTH);
                particle.position.y = Math.floor(Math.random() * WINDOW_HEIGHT);
                _particles.push(particle);
            }
        },
        
        _onParamsSubmit: function (event) {
            var particles = +particlesField_.value;
            if (particles >= 0) _self.updateParticles_(particles);
            event.preventDefault();
        },

        _onMouseMove: function (event) {
            _mouse.x = event.clientX;
            _mouse.y = event.clientY;
        },
        
        updateParticles_: function (numParticles) {
            var curParticles = _particles.length;
            
            if (numParticles > curParticles) {
                _self._createParticles(numParticles - curParticles);
            } else {
                _particles.splice(0, curParticles - numParticles);
            }
        },
        
        _updateFPS: function () {
            var time = +new Date(), fps, llastFrameTime;
            if ((llastFrameTime = lastFrameTime)) {
                fps = 1000 / (time - llastFrameTime);
                fpsCollected_.push(fps);
                if (!lastFpsDisplayTime || time - lastFpsDisplayTime > 500) {
                    lastFpsDisplayTime = time;
                    _fpsLabel.innerText = Math.round(
                            fpsCollected_.reduce(function (a, b) { return a + b;}) / fpsCollected_.length) + " fps";
                    fpsCollected_ = [];
                }
            }
            lastFrameTime = time;
        },

        _draw: function () {
            var i, ii;
            
            _self._updateFPS();

            _context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            _context.fillStyle = '#fff';
            
            for (i = 0, ii = _particles.length; i < ii; i += 1) {
                _acceleration = sVector.sSub(_mouse, _particles[i].position).normalize();
                _acceleration;
                _particles[i].addForce(_acceleration).update().paint(_context);
            }

            requestAnimationFrame(_self._draw);
        },

        _resize: function () {
            _canvas.width = WINDOW_WIDTH = window.innerWidth;
            _canvas.height = WINDOW_HEIGHT = window.innerHeight;
        }
    };

});

evt.on(window, "load", function () {
  new Application().init();
});
