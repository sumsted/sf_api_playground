'use strict';

var express = require('express');
var controller = require('./limits.controller');

var router = express.Router();

router.get('/', controller.getLimits);

module.exports = router;