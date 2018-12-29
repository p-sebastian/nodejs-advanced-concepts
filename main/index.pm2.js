// for use with pm2 clustering
// 0 lets pm2 set the number of instances based on the number of cores in the cpu
// pm2 start main/index.pm2.js -i 0

const crypto = require('crypto');

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
