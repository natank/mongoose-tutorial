var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/tutorial-mongs')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("wer'e connected");
});

function childParent() {

  var childSchema = new Schema({
    name: 'string'
  });
  childSchema.pre('save', (next) => {

    if ('invalid' == this.name) {
      console.log(`invalid:${this.name}`)
    } else {
      console.log(`valid:${this.name}`)
    }
    next();
  })

  var parentSchema = new Schema({
    name: 'String',
    // Array of subdocuments
    children: [childSchema],
    // Single nested subdocuments. Caveat: single nested subdocs only work
    // in mongoose >= 4.2.0
    child: childSchema
  });

  var Parent = mongoose.model('Parent', parentSchema);



  Parent.findOne()
    .then(addChild);

  function removeChild(parent) {

    let children = Array.prototype.slice.call(parent.children)
    console.log(`parent=${children}`)
    let shak = parent.children.find(child => child.name === "Carlos")
    console.log(`shak = ${shak}`)
    parent.children.id(shak._id).remove();
    parent
      .save()
      .then(parent => console.log(parent))
  }

  function addChild(parent) {
    parent.children.push({
      name: 'Carlos '
    });
    var subdoc = parent.children[0];
    console.log(subdoc);

    subdoc.isNew;

    parent.save()
      .then(parent => {
        console.log(parent)
      })
      .catch(err => console.log(err));
  }
}
(
  function nestedDocs() {
    const schema = new Schema({
      docArr: [{
        name: String
      }],
      singleNested: new Schema({
        level2: new Schema({
          name: String
        })
      })
    })
    const Model = mongoose.model('Test', schema);
    const doc = new Model({
      docArr: [{
        name: 'foo'
      }],
      singleNested: {
        level2: {
          name: 'bar'
        }
      }
    })
    console.log(doc)
    console.log(`result: ${doc.singleNested.parent() === doc}`);
    console.log(`result: ${doc.docArr[0].parent() === doc}`);
  }
)()