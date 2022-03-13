const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
});

const User = mongoose.model('User', {
	name: {
		type: String,
	},
	age: {
		type: Number,
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

// const task1 = new Task({ description: 'Update resume', completed: false });
// task1
// 	.save()
// 	.then((result) => console.log(result))
// 	.catch((err) => console.log(err));
