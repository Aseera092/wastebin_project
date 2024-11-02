var express = require('express');
const { adduserreq, getUserreq, updateUserreq, deleteUserreq } = require('../controller/userReqController');
var router = express.Router();


/* GET users listing. */
router.route('/')
    .get(getUserreq)
    .post(adduserreq)

router.route('/:name')
    .put(updateUserreq)
    .delete(deleteUserreq)



module.exports = router;
