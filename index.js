var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');

module.exports = function (schema, options) {
	var hitsType = Number;

	schema.add({
		hits: hitsType
	});
}