'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let UserSchema = new Schema({
	name: {
		type: String
	},
	openid: {
		type: String
	},
	province: {
		type: String
	},
	city: {
		type: String
	},
	sex: {
		type: Number
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: Date.now
	},
	accessToken: {
		type: String
	},
	restaurant: [{
		type: ObjectId,
		ref: 'Restaurant'
	}]
})

UserSchema.pre('save', function(next) {
	let now = new Date()
	this.updateAt = now
	next()
})

mongoose.model('User', UserSchema)
