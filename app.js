var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});

///////////////////////////////////////////////

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{
    body: String,
    date: Date
  }],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
})

var Blog = mongoose.model('Blog', blogSchema);

var animalSchema = new Schema({
  name: String,
  type: String
})
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({
    type: this.type
  }, cb)
}