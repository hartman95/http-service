// Initialize express router
let router = require('express').Router();

// Import controller
const controller = require('./controller');

// Get all objects
router.route('/objects/all')
    .get(controller.index);

// Get all objects per bucket
router.route('/objects/bucket/:bucketId')
    .get(controller.viewByBucket);

// Get, put, or delete an object
router.route('/objects/:bucketId/:objectId')
    .get(controller.view)
    .put(controller.new)
    .delete(controller.delete);

// Export API routes
module.exports = router;
