// Import model
BucketObj = require('../models/Bucket');

// Show all
exports.index = function (req, res) {
  // Return the url as 'text' from the request
  let query = BucketObj.find().select('data -_id');

  query.exec(function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

// Handle create
exports.new = function (req, res) {
  const newBucketObj = new BucketObj({
    'bucket_id': req.params.bucketId,
    'object_id': req.params.objectId,
    'data': req.url
  });

  // Save new object
  newBucketObj.save(function (err) {
    // Check for validation error and return 400 (normally would be 404)
    if (err) {
      res.status(400).json({
        message: 'Duplicate object_id ' + req.params.objectId + ' for bucket ' + req.params.bucketId,
      })
    } else {
      res.status(201).json({
        id: newBucketObj.object_id
      });
    }
  });
};

// Handle view
exports.view = function (req, res) {
  // Return the url as 'text' from the request
  let query = BucketObj.find({
      'object_id': req.params.objectId,
      'bucket_id': req.params.bucketId,
    }).select('data -_id');

  query.exec(function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

// Handle delete
exports.delete = function (req, res) {
  var objectId = req.params.objectId;
  var bucketId = req.params.bucketId;

  // TODO: find cleaner way
  // First search using find
  BucketObj.find({
    'object_id': objectId,
    'bucket_id': bucketId,
  }, function(err, result) {
    if (err) throw err;

    // Are there results
    if (Object.keys(result).length !== 0) {
      // Now remove
      BucketObj.remove({
        'object_id': objectId,
        'bucket_id': bucketId,
      }, function (err, bucket) {
        if (err) res.send(err);
        res.status(200).json({
          message: 'Deleted',
        });
      });

    } else {
      // No results found so return 400 (normally would be 404)
      res.status(400).json({
        message: 'Not Found',
      })
    }
  })
};

// Handle view by bucket
exports.viewByBucket = function (req, res) {
  // Return the url as 'text' from the request
  let query = BucketObj.find({
    'bucket_id': req.params.bucketId
  }).select('data -_id');

  query.exec(function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};
