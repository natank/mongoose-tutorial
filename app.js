var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("wer'e connected");
});

//validationIntro();
async function validationIntro() {
  var schema = new Schema({
    name: {
      type: String,
      required: true
    }
  });
  var Cat = db.model('Cat', schema);
  var cat = new Cat();
  try {
    let result = await cat.save();
  } catch (error) {
    //error = cat.validateSync();
    console.log(error);
  }
}

buildInValidators();
async function buildInValidators() {
  var breakfastSchema = new Schema({
    eggs: {
      type: Number,
      min: [6, 'Too few eggs'],
      max: 12
    },
    bacon: {
      type: Number,
      required: [true, 'Why no bacon?']
    },
    drink: {
      type: String,
      enum: ['Coffee', 'Tea'],
      required: function() {
        return this.bacon > 3;
      }
    }
  });

  var Breakfast = db.model('Breakfast', breakfastSchema);

  var badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
  });
  var error = badBreakfast.validateSync();
  console.log(`badBreakfast error #1: ${error}`);

  badBreakfast.bacon = 5;
  badBreakfast.drink = null;

  error = badBreakfast.validateSync();
  console.log(`badBreakfast error #2: ${error}`);

  badBreakfast.bacon = null;
  error = badBreakfast.validateSync();
  console.log(`badBreakfast error #3: ${error}`);
}
