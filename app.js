var mongoose = require('mongoose')
mongoose.connect('mongodb://nathank:windows10@ds359077.mlab.com:59077/tutorial-mng')

var db = mongoose.connection;