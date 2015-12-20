'use strict';

var express = require('express');
var controller = require('./echo.controller');

var router = express.Router();

router.get('/:message', controller.getEcho);
router.post('/', controller.postEcho);

module.exports = router;