// "Pyramid of Doom"
step1(function (value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                // Do something with value4
            });
        });
    });
});

// Syncing Multiple callbacks

var callbackACompleted = false;
var callbackBCompleted = false;

function callbackA(result) {
    // process result
    callbackACompleted = true;
    if (callbackBCompleted) {
        done();
    }
}

function callbackB(result) {
    // process result
    callbackBCompleted = true;
    if (callbackACompleted) {
        done();
    }
}

function done() {
    // things to do when boot callbacks completed their jobs
}

processA(params, callbackA);
processB(params, callbackB);
