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

const user = new User({ name: '  Baloe  ', email: 'JOIM@ld.cl.com', age: 33 });
user
	.save()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
