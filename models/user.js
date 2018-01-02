var connect = require('../config/database');

module.exports.findOne=function(where, callback){
	connect.init(function(err, client){
		if(err){
			console.log('Connection Error', err);
			return;
		}
		var db =  client.db('tss');
		db.collection('user').findOne(where, callback);
	});
}
module.exports.validPassword=function(password, obj){
	if(password != obj.password){
		console.log('wrong');
		return false;
	}
	if(password == obj.password){

		console.log('correct');
		return true;
	}
}