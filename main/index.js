const cluster = require('cluster');

/**
 * cluster.isMaster
 * Will return true if the instance is the cluster manager
 */

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* 
  // but in child mode
  // Creates 4 children instances
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else { // child instance
  const express = require('express');
  const app = express();
  
  function doWork(duration) {
    const start = Date.now();
    while(Date.now() - start < duration) {
      // simulates a certain amount of time, 
      // to block the event loop
    }
  }
  
  app.get('/', (req, res) => {
    doWork(5000);
    res.send('hello');
  });

  app.get('/fast', (req, res) => {
    res.send('this was fast');
  });
  
  app.listen(3000);
}
