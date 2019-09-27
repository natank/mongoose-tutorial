var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});


var schema2 = new Schema({
  test: {
    type: 'String',
    lowercase: true,
    default: () => "foofool"
  },
  test1: {
    type: 'String',
    default: function () {
      return this.test + " karamba"
    }
  }
})

var Str = mongoose.model('Str', schema2);

var str = new Str();
console.log(`test = ${str.test}`)
console.log(`test1 = ${str.test1}`)



var numberSchema = new Schema({
  integerOnly: {
    type: 'Number',
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  }
});

var Number = mongoose.model('Number', numberSchema);

var doc = new Number();
doc.integerOnly = 2.09;
console.log(doc.integerOnly); // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 