const express = require('express');
const mongoose = require('mongoose');

const Task = require('../db/models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
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
		const task = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const task = await Task.findByIdAndDelete(id);

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
