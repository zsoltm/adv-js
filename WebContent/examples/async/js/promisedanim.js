var PromisedAnim = function () {
  this.render();
  this.deferred_ = $.Deferred();
};

PromisedAnim.create = function (delay) {
  var pa = new PromisedAnim();
  return pa.run(delay);
};

PromisedAnim.prototype = {
  run: function (delay) {
    this.$div_.find(">div").animate({left: "0px"}, delay, this.onAnimationComplete_.bind(this));
    return this.deferred_.promise();
  },
  
  onAnimationComplete_: function () {
    this.deferred_.resolve("ok"); // "ok" param is just for demo purposes 
  },
  
  render: function () {
    this.$div_ = $('<div class="progress"><div></div></div>').appendTo("body");
  },
  
  destroy: function () {
    this.$div_.remove();
  }
};
