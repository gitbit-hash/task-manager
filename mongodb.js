const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log('Unable to connect to the database');
		}

		const db = client.db(databaseName);

		// Insert One Document
		// db.collection('users').insertOne(
		// 	{
		// 		name: 'hamada',
		// 		age: 36,
		// 	},
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert user');
		// 		}

		// 		console.log(result);
		// 	}
		// );

		// Insert Many Documents
		// db.collection('users').insertMany(
		// 	[
		// 		{
		// 			name: 'Mo Salah',
		// 			age: 39,
		// 		},
		// 		{
		// 			name: 'Snoop',
		// 			age: 54,
		// 		},
		// 		{
		// 			name: 'Banja',
		// 			age: 25,
		// 		},
		// 		{
		// 			name: 'Moze',
		// 			age: 25,
		// 		},
		// 	],
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert users');
		// 		}

		// 		console.log(result);
		// 	}
		// );

		//Query One Docuemnt
		// db.collection('users').findOne({ name: 'Snoop' }, (error, result) => {
		// 	if (error) {
		// 		return console.log('Unable to find user');
		// 	}

		// 	console.log(result);
		// });

		//Query One Docuemnt using ID
		// db.collection('users').findOne(
		// 	{ _id: new ObjectId('622e1a2b36ae6b33a5506832') },
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to find user');
		// 		}

		// 		console.log(result);
		// 	}
		// );

		//Query many Documents
		// db.collection('users')
		// 	.find({ age: 33 })
		// 	.toArray((error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to find users');
		// 		}

		// 		console.log(result);
		// 	});

		//Update one document
		// db.collection('users')
		// 	.updateOne(
		// 		{ _id: new ObjectId('622e1a2b36ae6b33a5506832') },
		// 		{ $set: { name: 'Lincolin' } }
		// 	)
		// 	.then((result) => console.log(result))
		// 	.catch((err) => console.log(err));

		//Update many documents
		// 	db.collection('tasks')
		// 		.updateMany(
		// 			{ completed: false },
		// 			{
		// 				$set: {
		// 					completed: true,
		// 				},
		// 			}
		// 		)
		// 		.then((result) => console.log(result))
		// 		.catch((err) => console.log(err));

		//Delete many Documents
		// db.collection('users')
		// 	.deleteMany({ age: 25 })
		// 	.then((result) => console.log(result))
		// 	.catch((err) => console.log(err));

		//Delete one document
		db.collection('tasks')
			.deleteOne({ _id: new ObjectId('622e3017e837fbe8689b2d77') })
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	}
);
