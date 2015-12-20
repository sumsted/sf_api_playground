'use strict';
console.log('loading limits.controller.js begin');
var sf = require('../../sf/helpers');

// Get sobject detail
exports.getLimits = function (req, res) {
    var url = sf.sfCredentials.rootUrl+'/services/data/v35.0/limits';
    console.log('sobject: '+url)
    var options = {
        'url': url,
        'headers': {
            'Authorization': ''
        }
    };
    sf.get(req.app, options, function(err, sfRes, body){
        console.log('callback called: '+body);
        res.json(JSON.parse(body));
    });
};
console.log('loading limits.controller.js end');