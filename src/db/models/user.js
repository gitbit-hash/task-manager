const { model, Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
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
					throw new Error(
						'Password field must not conatins the word (password)'
					);
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
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

userSchema.pre('remove', async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });

	next();
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) {
		throw new Error('Unable to login');
	}

	return user;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'mySuperSecretJWT');

	user.tokens = user.tokens.concat({ token });

	await user.save();

	return token;
};

const User = model('User', userSchema);

module.exports = User;
