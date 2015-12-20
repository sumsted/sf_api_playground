'use strict';
console.log('loading echo.controller.js begin');

// Get sobject detail
exports.getEcho = function (req, res) {
    console.log('echo message: '+req.params.message);
    res.json({"message":req.params.message});
};
exports.postEcho = function (req, res) {
    console.log('echo message: '+req.body);
    res.json({"message":req.body});
};
console.log('loading echo.controller.js end');