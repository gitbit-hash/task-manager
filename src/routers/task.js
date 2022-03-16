const express = require('express');
const mongoose = require('mongoose');

const Task = require('../db/models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', auth, async (req, res) => {
	const match = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	try {
		await req.user.populate({
			path: 'tasks',
			match,
		});
		res.send(req.user.tasks);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send();
	}

	try {
		const task = await Task.findOne({
			_id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send();
	}

	const updates = Object.keys(req.body);
	const allowedFields = ['description', 'completed'];
	const isValidUpdate = updates.every((update) =>
		allowedFields.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid update!' });
	}

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));

		await task.save();

		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send();
	}

	try {
		const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
