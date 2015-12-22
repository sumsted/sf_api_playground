console.log('loading sf/helpers.js begin');
var request = require('request');
var _this = this;

module.exports.sfCredentials = 
    {
        'url': 'https://login.salesforce.com/services/oauth2/token',
        'method':'POST',
        'form':{
            'grant_type':'password',
            'client_id':process.env.CLIENT_ID,
            'client_secret':process.env.CLIENT_SECRET,
            'username':process.env.USERNAME,
            'password':process.env.PASSWORD,
            'request_uri':'https://localhost'
        },
        'rootUrl': 'https://login.salesforce.com'
    };

module.exports.authorize = function(app){
	request(_this.sfCredentials, 
		function(err,res,body){
			if(!err && res.statusCode == 200){
				var sfAccess = JSON.parse(body);
				app.set('sfAccess', sfAccess);
                _this.sfCredentials.rootUrl = sfAccess.instance_url;
				console.log('sf.authorize success\nerr:'+err+'\nres: '+JSON.stringify(res)+'\nbody:'+body);
			}else{
				app.set('sfAccess', {});
				console.log('sf.authorize fail\nerr:'+err+'\nres: '+JSON.stringify(res)+'\nbody:'+body);
			}
		});	
};

module.exports.testAccessToken = function(app, res){
	var options = {
		'url': 'https://login.salesforce.com/services/data/v26.0/sobjects/',
		'headers':{
			'Authorization': ''
		}
	};
	var sfAccess = app.get('sfAccess');
	options.headers.Authorization = 'Bearer '+sfAccess.access_token;
	request(options, function(err, sfRes, body){
		if(!err && sfRes.statusCode == 200){
			console.log('sf good');
		} else {
			console.log('sf bad');
		}
		res.json(JSON.parse(body));
	});
};

module.exports.post = function(app, options, callback, reauth){
    reauth = typeof reauth !== 'undefined' ? reauth : true;
	var sfAccess = app.get('sfAccess');
	if(options.headers === undefined){
        options.headers = {'Authorization':'Bearer '+sfAccess.access_token};
    }else{
        options.headers.Authorization = 'Bearer '+sfAccess.access_token;
    }
	request.post(options, function(err, res, body){
		if(!err && res.statusCode >= 200 && res.statusCode < 300){
			callback(err, res, body);
		} else if(!err && body[0] !== undefined && body[0].errorCode == 'INVALID_SESSION_ID' && reauth) {
			console.log('bad sf auth');
            _this.reauthorize(app, options, module.exports.post, callback);
		} else {
			console.log('bad request:'+body);
            callback(err,res,body);
		}	
    });
};

module.exports.patch = function(app, options, callback, reauth){
    reauth = typeof reauth !== 'undefined' ? reauth : true;
	var sfAccess = app.get('sfAccess');
	if(options.headers === undefined){
        options.headers = {'Authorization':'Bearer '+sfAccess.access_token};
    }else{
        options.headers.Authorization = 'Bearer '+sfAccess.access_token;
    }
	request.patch(options, function(err, res, body){
		if(!err && res.statusCode >= 200 && res.statusCode < 300){
			callback(err, res, body);
		} else if(!err && body.errorCode == 'INVALID_SESSION_ID' && reauth) {
			console.log('bad sf auth');
            _this.reauthorize(app, options, module.exports.patch, callback);
		} else {
			console.log('bad request:'+body);
            callback(err,res,body);
		}	
    });
};

module.exports.get = function(app, options, callback, reauth){
    reauth = typeof reauth !== 'undefined' ? reauth : true;
	var sfAccess = app.get('sfAccess');
	if(options.headers === undefined){
        options.headers = {'Authorization':'Bearer '+sfAccess.access_token};
    }else{
        options.headers.Authorization = 'Bearer '+sfAccess.access_token;
    }
	request(options, function(err, res, body){
		if(!err && res.statusCode == 200){
			callback(err, res, body);
		} else if(!err && body.indexOf('INVALID_SESSION_ID')  > -1 && reauth) {
			console.log('bad sf auth');
            _this.reauthorize(app, options, module.exports.get, callback);
		} else {
			console.log('bad request:'+body);
            callback(err,res,body);
		}
	});
};

module.exports.reauthorize = function(app, options, method, callback){
	request.post({url:_this.sfCredentials.url, form: _this.sfCredentials.params}, 
		function(err,res,body){
			if(!err && res.statusCode == 200){
				var sfAccess = JSON.parse(body);
				app.set('sfAccess', sfAccess);
                _this.sfCredentials.rootUrl = sfAccess.instance_url;
                method(app, options, callback, false);
				console.log('sf.authorize success\nerr:'+err+'\nres: '+JSON.stringify(res)+'\nbody:'+body);
			}else{
				app.set('sfAccess', {});
				console.log('sf.authorize fail\nerr:'+err+'\nres: '+JSON.stringify(res)+'\nbody:'+body);
			}
		});	
};
console.log('loading sf/helpers.js end');
