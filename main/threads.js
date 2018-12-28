const crypto = require('crypto');

/**
 * Benchmark threads
 * proof that they run concurrently, their libuv library
 * runs outside the event loop, thats why their times are similar,
 * they are running on other threads handled by libuv thread pool
 * which is for computationally intensive tasks
 * Although the callbacks DO RUN in the event loop
 */
const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});
