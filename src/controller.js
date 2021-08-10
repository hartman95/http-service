// Import model
BucketObj = require('../models/Bucket');

// Show all
exports.index = function (req, res) {
  BucketObj.find()
      .then(items => res.send(items))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
};

// Handle create
exports.new = function (req, res) {
  const newBucketObj = new BucketObj({
    bucket_id: req.params.bucketId,
    object_id: req.params.objectId
  });

  newBucketObj.save(function (err) {
    // Check for validation error
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
  BucketObj.find({
    'object_id': req.params.objectId,
    'bucket_id': req.params.bucketId,
  }, function(err, result) {
    if (err) throw err;

    if (Object.keys(result).length !== 0) {
      res.status(200).send(result);

    } else {
      res.status(400).json({
        message: 'Not Found',
      })
    }
  })
};

// Handle delete
exports.delete = function (req, res) {
  var objectId = req.params.objectId;
  var bucketId = req.params.bucketId;
  BucketObj.find({
    'object_id': objectId,
    'bucket_id': bucketId,
  }, function(err, result) {
    if (err) throw err;
    // Was found
    if (Object.keys(result).length !== 0) {
      BucketObj.remove({
        'object_id': objectId,
        'bucket_id': bucketId,
      }, function (err, bucket) {
        if (err)
          res.send(err);
        res.status(200).json({
          message: 'Deleted',
        });
      });

    } else {
      res.status(400).json({
        message: 'Not Found',
      })
    }
  })
};

// Handle view by bucket
exports.viewByBucket = function (req, res) {
  BucketObj.find({
    'bucket_id': req.params.bucketId
  }, function(err, result) {
    if (err) throw err;

    if (Object.keys(result).length !== 0) {
      res.status(200).send(result);

    } else {
      res.status(400).json({
        message: 'No Objects Found in bucket ' + req.params.bucketId,
      })
    }
  })
};
