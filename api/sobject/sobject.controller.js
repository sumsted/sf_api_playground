'use strict';
console.log('loading sobject.controller.js begin');
var sf = require('../../sf/helpers');
// Get sobject detail
exports.getSobject = function(req, res) {
    var url = sf.sfCredentials.rootUrl + '/services/data/v26.0/sobjects/' + req.params.sobject + '/describe';
    console.log('sobject: ' + url)
    var options = {
        'url': url,
        'headers': {
            'Authorization': ''
        }
    };
    sf.get(req.app, options, function(err, sfRes, body) {
        console.log('callback called');
        res.json(JSON.parse(body));
    });
};
exports.getSobjectData = function(req, res) {
    var url = sf.sfCredentials.rootUrl + '/services/data/v26.0/sobjects/' + req.params.sobject + '/describe';
    console.log('sobject: ' + url)
    var options = {
        'url': url,
        'headers': {
            'Authorization': ''
        }
    };
    sf.get(req.app, options, function(err, sfRes, body) {
        console.log('callback called');
        var described = JSON.parse(body);
        var soql = 'select ';
        var fields = '';
        for(var i = 0; i < described.fields.length; i++) {
            if(i > 0) {
                fields += ', ';
            }
            fields += described.fields[i].name;
        }
        soql += fields + ' from ' + req.params.sobject + ' order by CreatedDate desc limit 5';
        options.url = sf.sfCredentials.rootUrl + '/services/data/v26.0/query?q=' + soql;
        console.log('getSobjectData query:' + options.url);
        sf.get(req.app, options, function(err, sfRes, body) {
            res.json(JSON.parse(body));
        });
    });
};
console.log('loading sobject.controller.js end');