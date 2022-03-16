const express = require('express');
const multer = require('multer');

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

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedFields = ['name', 'email', 'password', 'age'];
	const isValidUpdate = updates.every((update) =>
		allowedFields.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid update!' });
	}

	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));

		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();

		res.send(req.user);
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

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token !== req.token
		);
		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/users/logoutall', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

const upload = multer({
	dest: 'avatars',
});

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
	res.send();
});

module.exports = router;
