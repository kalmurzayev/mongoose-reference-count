mongoose-reference-count
========================

This mongoose plugin allows to keep track of number of references to a particular object in certain collection.

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
