(function (document, window) {
  var stdModel = !!document.addEventListener,
      actionMap = stdModel ?
      {  "on": "addEventListener",
        "off": "removeEventListener",
        "trigger": "dispatchEvent"} :
      {  "on": "attachEvent",
        "off": "detachEvent",
        "trigger": "fireEvent"},
        
      getEvtName = function (name) { return "on" + name; },
      event = {};

  Object.keys(actionMap).forEach(function (key) {
    var action = actionMap[key];
    event[key] = stdModel ?
        function (node, eventName, handler, cPhase, opt_scope) {
          return node[action].call(node, eventName,
              opt_scope ? handler.bind(opt_scope) : handler, cPhase || false);
        } :
        function (node, eventName, handler, opt_scope) {
          return node[action].call(node, getEvtName(eventName),
              opt_scope ? handler.bind(opt_scope) : handler); // + event name conversion
        };
  });
  
  window.evt = event;
})(document, window);
