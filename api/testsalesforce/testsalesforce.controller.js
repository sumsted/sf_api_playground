'use strict';
console.log('loading testsalesforce.controller.js begin');
var sf = require('../../sf/helpers');

// Get list of testsalesforces
exports.index = function (req, res) {
//     var options = {
//         'url': 'https://cs41.salesforce.com/services/data/v26.0/sobjects/',
//         'headers': {
//             'Authorization': ''
//         }
//     };
    var options = {
        'url': sf.sfCredentials.rootUrl+'/services/data/v26.0/sobjects/',
        'headers': {
            'Authorization': ''
        }
    };
    sf.get(req.app, options, function(err, sfRes, body){
        console.log('callback called');
        res.json(JSON.parse(body));
    });
};
console.log('loading testsalesforce.controller.js end');