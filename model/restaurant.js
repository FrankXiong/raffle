'use strict'

const mongoose = require('mongoose')
let Schema = mongoose.Schema

let RestaurantSchema = new mongoose.Schema({
	name: String,
	navigation: String,
	city: String,
	area: String,
	address: String,
	phone: String,
	latitude: Number,
	longitude: Number,
	stars: Number,
	avgPrice: String,
	photos: String,
	tags: String,
	allRemarks: {
		type: Number,
		default: 0
	},
	veryGoodRemarks: {
		type: Number,
		default: 0
	},
	goodRemarks: {
		type: Number,
		default: 0
	},
	commonRemarks: {
		type: Number,
		default: 0
	},
	badRemarks: {
		type: Number,
		default: 0
	},
	environmentRating: {
		type: Number,
		default: 0
	},
	serviceRating: {
		type: Number,
		default: 0
	}
})

mongoose.model('Restaurant', RestaurantSchema)
