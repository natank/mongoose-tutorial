var mongoose = require('mongoose')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});

var kittySchema = new mongoose.Schema({
  name: String
})

kittySchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name;"
  console.log(greeting)
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({
  name: 'fluffy'
});
fluffy.speak();

fluffy.save()
  .then(function (fluffy) {
    fluffy.speak();
  })
  .catch(err => console.error(err))