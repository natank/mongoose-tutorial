var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MyModel = mongoose.model('Test', new Schema({
  name: String
}, {
  bufferCommands: false
}));
MyModel.findOne(function (error, result) {
  if (error) {
    console.log(`mongoose error : ${error}`);
  } else {
    console.log(`result: ${result}`);
  }
})

setTimeout(function () {
  mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')
}, 600000)
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});