const express = require('express');
const router = express.Router();
const { authenticateUser,authorizePermissions} = require('../middleware/authentication');


const {
    createShowTime,
    getAllShowTime,
    getSingleShowTime,
    updateShowTime,
    deleteShowTime,
  } = require('../controllers/showTimeController');



  router.route('/').post([authenticateUser, authorizePermissions('admin')], createShowTime).get(getAllShowTime);

  router
    .route('/:id')
    .get(getSingleShowTime)
    .patch([authenticateUser, authorizePermissions('admin')], updateShowTime)
    .delete([authenticateUser, authorizePermissions('admin')], deleteShowTime);
  
  module.exports = router;

