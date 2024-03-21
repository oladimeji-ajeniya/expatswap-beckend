import config from '../config';
import logger from '../log/logger';
import server from '../http/server';
import { client } from '../db/connection';

export async function start(): Promise<void> {
	await client.connect();
	console.log('Connection to MongoDB started');

	// http server
	await new Promise<void>((resolve, reject) => {
		function onFinish() {
			server.off('listening', onListening);
			server.off('error', onError);
		}

		function onListening() {
			resolve();
			onFinish();
		}
		function onError(err: Error) {
			reject(err);
			onFinish();
		}

		server.once('listening', onListening);
		server.once('error', onError);

		server.listen(config.http.port, config.http.hostname);
	});

	logger.info(`App started at http://${config.http.hostname}:${config.http.port}/`);
	logger.info(`App started at port ${config.http.port}`);
}

let stopping = false;

export async function stop(): Promise<void> {
	if (stopping) {
		await client.close();
		console.log('Connection to MongoDB closed');
	}
	stopping = true;

	logger.info('Closing HTTP Server...');
	await server.closeWithSockets(config.shutdown.interval * 1000)
		.catch((err) => logger.error(err));

	logger.info('Closing DB connection...');
	await client.close();

	logger.info('Peacefully shutdown completed');
}
