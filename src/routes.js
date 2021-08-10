// Initialize express router
let router = require('express').Router();

// Import controller
const controller = require('./controller');

// Bucket controller routes
router.route('/all')
    .get(controller.index);

router.route('/bucket/:bucketId')
    .get(controller.viewByBucket);

router.route('/:bucketId/:objectId')
    .get(controller.view)
    .put(controller.new)
    .delete(controller.delete);

// Export API routes
module.exports = router;
