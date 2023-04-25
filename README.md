mongoose-reference-count
========================

This Mongoose plugin allows keeping track of the number of references to a particular object in a certain collection. It is useful when you need to know how many times an object is used or referenced, such as when deleting an object that is referenced by other documents in the collection.

The second section demonstrates how to query a collection using Mongoose's "findOne" method, specifying certain criteria to locate a specific document in the collection. This is a fundamental operation when working with MongoDB, and Mongoose's query-building tools make it easier to write and execute queries in a more structured and organized manner. Following the execution of the query, the results are logged to the console, and additional work can be performed within the callback function. 

Overall, this code is helpful for developers building Node.js applications that use MongoDB as their primary data store and want to use the Mongoose library to simplify the process of working with MongoDB. The code examples demonstrate how to use some of the key features of Mongoose, including schema creation, query building, and plugin support, which are all necessary for building robust and scalable applications.


## Usage

```javascript
var refCount = require('mongoose-reference-count');
var mongoose = require('mongoose');

// define our schema
var Schema = {
    name: String,
    address: String,
    dateOfBirth: Date
};
// adding plugin to schema
Schema.plugin(refCount);
var Person = mongoose.model('Person', Schema);

var newGuy = new Person({name: 'Azamat', address: 'Sesame street', dateOfBirth: new Date(91,1,1)});
newGuy.save();
```

Now let's make some queries to `Person` with `Schema` schema
```javascript
Person.findOne((name: 'Azamat')function(err, data) {
  if (err){
    console.log(err);
  }
  console.log(data);
  //some additional work
});
```
This plugin does two things:
1) adds *hits* attribute to schema
2) adds *post* middleware for `findOne()` method on requested model

The following will be printed
```javascript
{
  _id: someID,
  name: 'Azamat',
  address: 'Sesame street',
  dateOfBirth: 'Jan-1-1991',
  hits: 1
}
```

# TODO
- add reference count when object is retrieved with find() method along with other objects.


# An example of customizing the "mongoose-reference-count" plugin:
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var referenceCount = function (schema, options) {
    // Create a virtual property in the schema to track references.
    schema.virtual('refCount').get(function () {
        // Obtain the referenced collection's model.
        var RefModel = mongoose.model(options.refModel);
        // Return the number of references this document has in the referenced collection.
        return RefModel.countDocuments({[options.field]: this._id});
    });
};
```
