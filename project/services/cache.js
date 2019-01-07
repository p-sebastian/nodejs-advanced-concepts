const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

/**
 * Replacing the exec function
 */
mongoose.Query.prototype.exec = function () {
  console.log('about to run a query');

  // // gets query object
  // console.log(this.getQuery());
  // // gets collection
  // console.log(this.mongooseCollection.name);

  // Create a copy
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  });
  console.log(key);

  return exec.apply(this, arguments);
};