const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var foodSchema = {
	name: String,
	carbs: Number,
	fat: Number,
	protein: Number,
	Calories: Number
}

module.exports = mongoose.model("food", foodSchema);