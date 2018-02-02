var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestSchema = new Schema ({
	title: String
})


var Test = mongoose.model('TestSchema', TestSchema);

module.exports = Test
