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
		// 			name: 'Buten',
		// 			age: 33,
		// 		},
		// 		{
		// 			name: 'Biden',
		// 			age: 36,
		// 		},
		// 		{
		// 			name: 'Pablo',
		// 			age: 12,
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
		db.collection('users').findOne(
			{ _id: new ObjectId('622e1a2b36ae6b33a5506832') },
			(error, result) => {
				if (error) {
					return console.log('Unable to find user');
				}

				console.log(result);
			}
		);

		//Query many Documents
		// db.collection('users')
		// 	.find({ age: 33 })
		// 	.toArray((error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to find users');
		// 		}

		// 		console.log(result);
		// 	});
	}
);
