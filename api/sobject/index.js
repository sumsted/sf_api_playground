'use strict';

var express = require('express');
var controller = require('./sobject.controller');

var router = express.Router();

router.get('/:sobject', controller.getSobject);
router.get('/query/:sobject', controller.getSobjectData);
module.exports = router;