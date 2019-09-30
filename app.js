var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng');
conn = mongoose.connection;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("wer'e connected");
});

//Globals

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  band: String
});

const storySchema = Schema({
  authors: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const userSchema = new Schema({
  name: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  band: String
});

const BandSchema = new Schema({
  name: String
});

BandSchema.virtual('members', {
  ref: 'User',
  localField: 'name',
  foreignField: 'band',
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 }
});

// Create Models
const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
const User = mongoose.model('User', userSchema);
const Band = mongoose.model('Band', BandSchema);

//Functions

// populateIntro();
// refsToChildren();
userStartup();
bandStartup();
multiLevelPopulate();

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

  const fan3 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ricky Martin',
    age: 47
  });

  const fan4 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Luis Miguel',
    age: 33
  });

  try {
    //await author.save();
    //let p = Promise.all([fan1.save(), fan2.save(), fan3.save(), fan4.save()]);
    //await p;

    // const story1 = new Story({
    //   title: 'Casino Royale',
    //   authors: [author._id],
    //   fans: [fan1._id, fan2._id, fan3._id, fan4._id]
    // });
    //await story1.save();

    let foundStory = await Story.findOne({ title: 'Casino Royale' })
      .populate('authors', 'name age')
      .populate({ path: 'fans', match: { age: { $gte: 50 } }, select: 'name age -_id' });
    console.log(`The author is ${foundStory.authors}`);
    console.log(`The fans are: ${foundStory.fans}`);
  } catch (error) {
    console.log(error);
  }
}

async function refsToChildren() {
  let author = await Person.findOne({ name: 'Ian Fleming' }).populate('stories');
  let story = await Story.findOne({ title: 'Casino Royale' });
  // author.stories.push(story._id);
  // await author.save();
  author = await Person.findOne({ name: 'Ian Fleming' }).populate({ path: 'stories', select: 'title -_id' });
  console.log(`author: ${author}`);
}

async function userStartup() {
  let user1 = new User({
    name: 'Carlos',
    band: 'Los Ciegos Del Barrio'
  });

  let user2 = new User({
    name: 'Shakira',
    band: 'Grupo Niche'
  });

  let user3 = new User({
    name: 'Diego',
    band: 'Los Lobos'
  });

  user1.friends.push(user2._id, user3._id);
  user2.friends.push(user1._id, user3._id);
  user3.friends.push(user1._id, user2._id);
  console.log(user1);

  let users = await Promise.all([user1.save(), user2.save(), user3.save()]);

  console.log(users);
}

async function bandStartup() {
  let band1 = new Band({
    name: 'Los Ciegos Del Barrio'
  });
  let band2 = new Band({
    name: 'Grupo Niche'
  });
  let band3 = new Band({
    name: 'Los Lobos'
  });

  let bands = await Promise.all([band1.save(), band2.save(), band3.save()]);

  console.log(bands);
}

async function multiLevelPopulate() {
  let bandMembers = await Band.findOne({ name: 'Grupo Niche' }).populate('members', 'name -_id -band');
  // .populate({ path: 'fans', match: { age: { $gte: 50 } }, select: 'name age -_id' });
  // .populate('authors', 'name age')
  console.log(`members:\n ${bandMembers.members}`);
}
