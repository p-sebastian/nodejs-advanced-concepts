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

app.listen(3000);