(function () {
  var tasks = [], $done = null, on = true;
  
  function onSubmit(e) {
    if (on) {
      var reqTasks = +$("#tasks").val(), i, runningTasks;

      on = false;
      
      // optionally clean up after previous run
      tasks.forEach(function (e) { e.destroy(); });
      tasks = [];
      if ($done) { $done.remove(); }

      // create tasks
      for (i = 0; i < reqTasks; i += 1) {
        tasks.push(new PromisedAnim);
      }

      // start tasks
      runningTasks = tasks.map(function (task) {
        return task.run(Math.random() * 1200 + 600);
      });
      
      // use when, which provides a combo promise
      $.when.apply(this, runningTasks).then(function () {
        $done = $("<p>done!</p>").appendTo("body");
        on = true;
      });
    }
    e.preventDefault();
  }
  
  $("#params").on("submit", onSubmit);
})();
