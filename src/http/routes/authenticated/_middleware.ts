import jwt from 'jsonwebtoken';
import { asyncWrapper } from '@cdellacqua/express-async-wrapper';
import { HttpError } from '../../error';
import config from '../../../config';
import { HttpStatus } from '../../status';

const middleware = asyncWrapper(async (req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Missing or invalid authorization header');
	}

	const token = authorizationHeader.substring('Bearer '.length);
	let decoded;

	try {
	  decoded = jwt.verify(token, config.secret) as { sub: string; iat: number };
	} catch (err) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Failed to decode token', err);
	}

	if (!decoded) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Token decode returned a falsy value');
	}

	const user = { id: 1, enabled: true, minJwtIat: new Date() };

	if (!user) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Token refers to a missing user');
	}

	if (!user.enabled) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Token refers to a disabled user');
	}

	const tokenIatTimestamp = decoded.iat * 1000;

	if (user.minJwtIat && user.minJwtIat.getTime() > tokenIatTimestamp) {
	  throw new HttpError(HttpStatus.Unauthorized, 'Unauthorized: Token iat is less than the min required for the specified user');
	}

	res.locals.user = user;
	next();
});

export default middleware;
