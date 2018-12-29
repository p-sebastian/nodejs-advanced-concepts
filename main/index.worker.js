// for use with Worker Threads

const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {

  // worker passed function to constructor CANNOT access external variables
  // since it escentially gets serialized and passed somewhere outside the app
  const worker = new Worker(function() {
    // Both onmessage must be functions with their own context
    // since that context (this) refers to the worker thread object
    // NO arrow functions

    // invoked on worker.postMessage()
    this.onmessage = function() {
      let counter = 0;
      // simulate some work
      while (counter < 1e9) {
        counter++;
      }
      // invokes worker.onmessage()
      postMessage(counter);
    }
  });
  // when worker sends a message, this function will be called
  worker.onmessage = function({ data }) {
    console.log(data);
    res.json({ data });
  }

  // send data to worker, also its like saying worker start working.
  // this is what starts the worker
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('this was fast');
});

app.listen(3000);
