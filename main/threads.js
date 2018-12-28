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

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

/**
 * Since the threadpool ONLY 4 threads available, 4 proccesses 
 * will run concurrently but the fifth one will run after.
 * Showing the following times
 * 3: 1217
 * 4: 1226
 * 2: 1230
 * 1: 1259
 * 5: 2248 // difference
 * 
 * But it will also depend on the CPU, if it has hyperthreading,
 * or the amount of cores, for handling the threads concurrently
 * Still the node thread pool has 4 threads available
 */

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});