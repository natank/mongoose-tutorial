var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
//mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

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
  type: String,
  tags: {type: [String], index: true}
})

animalSchema.set('autoIndex', false)

animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({
    type: this.type
  }, cb)
}



animalSchema.statics.findByName = function(name){
  return this.find({name: new RegExp(name, 'i')});
}

animalSchema.static('findByBreed', function(breed){
  return this.find({breed});
})


animalSchema.index({name: 1, type: -1})

var Animal = mongoose.model('Animal', animalSchema);

Animal.on('index', function(error){
  //console.log(error)
})

/**Virtuals */

var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
})

personSchema.virtual('fullName')
  .get(function(){
    return this.name.first + ' '  + this.name.last;
  })
  .set(function(v){
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ')+1)
  });

  



var Person = mongoose.model('Person', personSchema);

var axl = new Person({
  name: {first: 'Axl', last: 'Rose'}
})

axl.fullName = 'William Rose'

console.log(axl.fullName);
