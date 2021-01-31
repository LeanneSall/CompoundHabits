const express = require('express');
const router = express.Router();

//:userId/habits

//GET
router.get('/', function (req, res) {
    res.send('Get current habits');
})

//POST
router.post('/', function (req, res) {
    res.send('create new habit');
})

//PUT
router.put('/', function (req, res) {
    res.send('update habit');
})

//DELETE
router.delete('/', function (req, res) {
    res.send('deleted habit');
})


module.exports = router;