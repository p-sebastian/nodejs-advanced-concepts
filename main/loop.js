/**
 * FAKE CODE
 * For understanding the event loop
 */

// node myFile.js

// simulate operations stack
// these get created at the beginning 
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

/**
 * Performs 3 checks to know wether the event loop should continue
 */
function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setInmediate?
  // Check two: Any pending OS tasks? (like server listening on port)
  // Check three: Any pending long running operations? (like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}
// event loop
// every time it does a loop, its refered as a 'tick'
// entire body executes in one 'tick'
while(shouldContinue()) {
  // 1) Node lools at pendingTimers ands sees if any functions
  // are ready to be called. setTimeout, setInterval

  // 2) Node looks at pendingOSTasks and PendingOperations and
  // calls relevant callbacks

  // 3) Pause execution. Continue when...
  // - a new pendingOSTaks is done
  // - a new pendingOperation is done
  // - a timer is about to complete
  // *** important since it doesnt just loop as fast as possible
  // it will wait a bit for something to happen

  // 4) look at pendingTimers. call any and only setInmediate

  // 5) handle any 'close' events; escentially cleanup code events
}

// exit back to terminal