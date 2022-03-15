const { model, Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
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

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

module.exports = model('User', userSchema);
