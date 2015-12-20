'use strict';
console.log('loading order.controller.js begin');

exports.getOrder = function (req, res) {
    console.log('echo message: '+req.params.message);
    res.json({"message":req.params.message});
};
exports.postOrder = function (req, res) {
    console.log('order message: '+req.body);
    var resObject = {};
    if(req.body.hasOwnProperty('account')){
        var account = req.body.account;        
        resObject = {"status":"SUCCESS",
                  "account": account,
                  "meter":"A001",
                  "assets":[
                     {"description":"cpu", "serial": "SN94949494"},
                     {"description":"printer", "serial": "SN000123345"},
                     {"description":"scale", "serial": "SN222233334"}
                 ]};
    }else{
        resObject = {
            "status": "ERROR",
            "message": "account is missing"
        };
    }
    res.json(resObject);
};
console.log('loading order.controller.js end');