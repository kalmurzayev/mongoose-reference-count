var postFind = require('mongoose-post-find');

module.exports = function (schema, options) {
    var hitsType = {
        type: Number,
        default: 0,
        index: true
    };

    schema.add({
        hits: hitsType
    });
    schema.plugin(postFind, {
        findOne: function (result, done) {
            if (result) {
                result.hits = (!result.hits) ? 1 : result.hits + 1;
                result.save(function (err, argument) {
                    if (err) {
                        console.log('MongooseReferenceCount: Failed to update count')
                        console.log(err);
                    }
                });
            }
            done(null, result);
        }
    });
}