var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});

var schema = new mongoose.Schema({
  name: 'string',
  size: 'string'
});
var Tank = mongoose.model('Tank', schema);

var small = new Tank({
  size: 'small'
})
// small.save((error) => console.log(error))

// Tank.insertMany([{
//     size: 'big'
//   }, {
//     size: 'medium'
//   }])
//   .then(() => console.log('items were saved successfully'))
//   .catch(err => console.log(err))

Tank.deleteOne({
    size: 'smallcc'
  })
  .then(() => console.log('successfuly deleted'))
  .catch(err => console.log(err))

Tank.updateOne({
    size: 'big'
  }, {
    model: 'T-990'
  })
  .then(() => {
    console.log(`Successfully updated ${Tank.size}`)
  })
  .catch(error => console.log(error))