var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});


(function constructingDocs() {
  var nameSchema = new Schema({
    first: "String",
    last: "String"
  })



  var yourSchema = new Schema({
    name: nameSchema,
    occupation: "String"
  })

  var Person = mongoose.model('Person', yourSchema)

  Person.create({
      name: {
        first: "Carlos",
        last: "Vives"
      },
      occupation: "Singer"
    })
    .then((doc) => {

      Person.findOne({
          'name.first': 'Carlos'
        })
        .select('name.first occupation')
        .then(person => console.log(`${person.name.first} is a ${person.occupation} `))
        .catch(err => console.log(err))
    })
})()