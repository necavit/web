# mongodb #

The [mongod](http://www.mongodb.org/) database to which the Hades API connectis must be running on a localhost interface, listening to port 50505.

To achieve this configuration, if we installed the mongodb system under Linux/Ubuntu through the OS package manager, we will have to modify the mongodb configuration file, located at `/etc/mongodb.conf`. There is a commented line there which we will uncomment and set to `port = 50505`.

Once we have done this, we can manage the mongodb service using the appropriate service calls (see section on mongodb management).


## Hades and mongodb ##

The API connects to the locally running mongodb service using the `mongoose` library. In just a single line, a connection can be achieved:

```javascript
var mongoose = require('mongoose');
...
mongoose.connect('mongodb://localhost:50505/hades');
```

### Schema ###

Hades API has the schema definitions for the objects that will be stored under the `model` folder. All files there are required on bootstrap, by doing:

```javascript
var fs = require('fs');
...
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) {
    require(__dirname + '/models/' + filename);
  }
});
```

A schema definition file for a mongodb *users* collection would look like:

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: String,
  password: String
});

mongoose.model('users', usersSchema);
```

And should be named `users.js`, in order to load it up during application bootstrap.

## mongodb administration ##

### TODO ###
