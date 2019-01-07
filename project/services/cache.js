const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

/**
 * Replacing the exec function
 */
mongoose.Query.prototype.exec = async function () {
  // Create a copy
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));

  // See if we have value for 'key' in redis
  const cacheValue = await client.get(key);

  // If we do, return that
  if (cacheValue) {
    /**
     * Must return instances of mongoose.Document
     * since cacheValues is just a json at the moment
     * 
     * this.model is the reference of the model that the current
     * running query is attached to
     * 
     * new this.model(...obj)
     * will only work for objects, for arrays every object must be an instance of document
     */
    const doc = new this.model(JSON.parse(cacheValue));

    return doc;
  }

  // Else, issue query and store result in redis


  // Result from mongodb, its actually a mongoose document instance
  const result = await exec.apply(this, arguments);
  // set query in redis
  client.set(key, JSON.stringify(result));

  return result;
};


  // // gets query object
  // console.log(this.getQuery());
  // // gets collection
  // console.log(this.mongooseCollection.name);
