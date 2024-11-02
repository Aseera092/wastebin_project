var express = require('express');
const { getUser, AddUser, updateUser, deleteUser } = require('../controller/userController');
const { getRequest, AddRequest, getRequestById, updateRequestStatus } = require('../controller/requestController');
var router = express.Router();

/* GET users listing. */
router.route('/')
  .get(getUser)
  .post(AddUser)

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser)

router.route('/request')
  .get(getRequest)
  .post(AddRequest)

router.route('/request/:id').get(getRequestById)
router.route('/request/:id').put(updateRequestStatus)



module.exports = router;
