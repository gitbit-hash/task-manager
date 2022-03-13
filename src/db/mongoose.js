const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
});

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

const Task = mongoose.model('Task', {
	description: {
		type: String,
	},
	completed: {
		type: Boolean,
	},
});

const user = new User({
	name: '  Baloe  ',
	email: 'JOIM@ld.cl.com',
	password: '23',
	age: 33,
});
user
	.save()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
