import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config';

// Database connection
const uri = config.database.connection;

// Database Name
const dbName = process.env.DATABASE_NAME;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: false,
	},
});

const database = client.db(dbName);

export { client, database };
