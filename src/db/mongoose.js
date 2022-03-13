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

const me = new User({ name: 'Mo Jski', age: 23 });
me.save()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
