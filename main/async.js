const https = require('https');

/**
 * for ./loop.js
 * the async tasks such as networking are
 * represented by the 'pendingOSTasks' array
 */

const start = Date.now();

/**
 * libuv delegates http calls to the 'OS Async Helpers', so all
 * of these requests are non-blocking but are not managed by
 * either node or libuv, libuv justs waits for the OS to send back
 */
function doRequest() {
  https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => console.log(Date.now() - start));
  }).end();
}

/**
 * Since the OS does this, it all runs concurrently
 * BUT, they are not handled by the libuv threadpool
 */
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();