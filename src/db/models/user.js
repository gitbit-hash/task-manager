const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('you must provide a valid email address');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.includes('password')) {
				throw new Error('Password field must not conatins the word (password)');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value <= 21) {
				throw new Error('Age must be at least 21');
			}
		},
	},
});

module.exports = User;
