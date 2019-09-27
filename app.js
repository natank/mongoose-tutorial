var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});


const schema = new Schema({
  name: String,
  age: {
    type: Number,
    min: 0
  }
});
const Person = mongoose.model('Person', schema);

let p = new Person({
  name: 'foo',
  age: 'bar'
});
// Cast to Number failed for value "bar" at path "age"
p.validate()
  .then(() => {
    console.log("validated");
  }).catch(err => console.log(`error validating\n: ${err}`));

let p2 = new Person({
  name: 'foo',
  age: -1
});
//age ` (-1) is less than minimum allowed value (0).
p2.validate()
  .then(() => {
    console.log("validated 2");
  })
  .catch(err => console.log(`error validating 2\n: ${err}`));