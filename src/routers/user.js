const express = require('express');
const mongoose = require('mongoose');

const User = require('../db/models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(500).send();
	}
});

router.patch('/users/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	const updates = Object.keys(req.body);
	const allowedFields = ['name', 'email', 'password', 'age'];
	const isValidUpdate = updates.every((update) =>
		allowedFields.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid update!' });
	}

	try {
		const user = await User.findById(id);

		updates.forEach((update) => (user[update] = req.body[update]));

		await user.save();

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const user = await User.findByIdAndRemove(id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/users/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
