var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
//mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});