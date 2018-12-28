process.env.UV_THREADPOOL_SIZE = 4;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => console.log('Async', Date.now() - start));
  }).end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

/**
 * request
 * hash
 * fs // because fs does 2 roundtrips to disk, hence removing it from the thread
 *    // allowing it to be used by another hash, once another hash finishes FS will
 *    // take the free thread and continue.
 * hash
 * hash
 */
doRequest();

fs.readFile('main/multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();