// Threadpool size for EVERY child
process.env.UV_THREADPOOL_SIZE = 1;

/**
 * BENCHMARK RESULTS
 * ab -c 1 -n 1 localhost:3000/
 * 
 * @var tt total time
 * @var rps Requests per second
 * @var tpr Time per request, mean across all concurrent
 * 
 * * 1 request, 1 concurrent; 1 child, 1 thread
 * - tt: 1.052 s
 * - rps: 0.95 #/s
 * - tpr: 1051 ms
 * 
 * * 2 request, 2 concurrent; 1 child, 1 thread
 * - tt: 2.098 s
 * - rps: 0.95 #/s
 * - tpr: 1048 ms 
 * 
 * slows all down
 * * 6 request, 6 concurrent; 6 children, 1 thread
 * - tt: 2.554 s
 * - rps: 2.35 #/s
 * - tpr: 425 ms 
 * 
 * faster response for each
 * * 6 request, 6 concurrent; 2 children, 1 thread
 * - tt: 4.149 s
 * - rps: 1.45 #/s
 * - tpr: 691 ms 
 */

const cluster = require('cluster');
const crypto = require('crypto');

/**
 * cluster.isMaster
 * Will return true if the instance is the cluster manager
 */

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* 
  // but in child mode
  // Creates 4 children instances
  /**
   * Every child has its OWN threadpool with 4 default threads
   */
  cluster.fork();
  cluster.fork();
} else { // child instance
  console.log(cluster.worker.id);
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('hello');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('this was fast');
  });
  
  app.listen(3000);
}
