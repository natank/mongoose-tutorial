var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("wer'e connected");
});

populateIntro();

async function populateIntro() {
  console.log('----Populate Intro -----\n');
  // Create Schema
  const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });

  const storySchema = Schema({
    authors: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });

  // Create Models
  const Story = mongoose.model('Story', storySchema);
  const Person = mongoose.model('Person', personSchema);

  //Create Documents
  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50
  });

  const fan1 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Carlos Vives',
    age: 58
  });

  const fan2 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Gloria Esteban',
    age: 63
  });

  try {
    await author.save();
    await fan1.save();
    await fan2.save();
    const story1 = new Story({
      title: 'Casino Royale',
      authors: [author._id],
      fans: [fan1._id, fan2._id]
    });
    await story1.save();

    let foundStory = await Story.findOne({ title: 'Casino Royale' })
      .populate('authors', 'name age')
      .populate('fans', 'name age');
    console.log(`The author is ${foundStory.authors}`);
    console.log(`The fans are: ${foundStory.fans}`);
  } catch (error) {
    console.log(error);
  }
}
