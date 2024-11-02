var express = require('express');
const { AddDriver, getDriver, updateDriver, deleteDriver, machineDirection, driverLogin } = require('../controller/driverController');
var router = express.Router();


/* GET users listing. */
router.route('/')
    .get(getDriver)
    .post(AddDriver)

router.route('/:id')
    .put(updateDriver)
    .delete(deleteDriver)

router.route('/direction').post(machineDirection)
router.post('/login', driverLogin);

module.exports = router;
