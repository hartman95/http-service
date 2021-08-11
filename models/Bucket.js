// Import our modules
const mongoose = require('mongoose');

// Setup schema
let bucketSchema = mongoose.Schema({
  bucket_id: {
    type: String,
    required: true
  },
  object_id: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
});

// Prevent duplicates per bucket
bucketSchema.index({ bucket_id: 1, object_id: 1 }, { unique: true });

// Export our Object model
let Bucket = module.exports = mongoose.model('bucket', bucketSchema);

module.exports.get = function (callback) {
  Bucket.find(callback);
}
