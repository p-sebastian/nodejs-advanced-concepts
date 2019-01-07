/**
 * Person is a mongoose collection
 * each of the query methods, modify the query before execution
 * and they return a query object which is a promise
 */
const query = Person
              .find()
              .select('name');
  

/**
 * Returns in one single object all the config options of the query
 * like: { find: { select: 'name' }, ...};
 * We can stringify it and use it as the key for redis, since
 * its more unique, and specific for each query.
 */
query.getOptions();

/**
 * Ways to execute a query
 * All of them execute .exec() behind the scenes
 */

// exec: (err: any, res: any) => void;
query.exec();

// Promise resolve
query.then();

// using async/await for resolving the promise
const result = await query;


/**
 * We could modify .exec to handle redis caching
 */

query.exec = function() {
  // Check if query has been excecuted and if it has, return the result straight away
  const result = client.get('query key');
  if (result) { return result; }

  // otherwise run the query *normally*
  const result = runTheOriginalExecFn();

  // Save the value in redis
  client.set('query key'. result);

  return result;
};