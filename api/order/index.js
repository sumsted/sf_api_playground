'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/:message', controller.getOrder);
router.post('/', controller.postOrder);

module.exports = router;