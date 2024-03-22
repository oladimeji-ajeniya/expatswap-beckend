import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { asyncWrapper } from '@cdellacqua/express-async-wrapper';
import { HttpStatus } from '../status';
import { PaginationParams } from '../../types/common';
import { validateUser } from '../validations/validateUser';
import UserService from '../../services/user';
import { extractPaginationParams } from '../../utils/utility';

const userHandler = new UserService('user');
const router: Router = Router();

export default router;

router.post('/api/user', validateUser, async (req: Request, res: Response) => {
	const errors = validationResult(req.body);
	if (!errors.isEmpty()) {
		return res.status(HttpStatus.BadRequest).json({ errors: errors.array() });
	}
	try {
		const user = await userHandler.addUser(req.body.user);
		res.status(HttpStatus.Created).json(user);
	} catch (error) {
		console.error(error);
		res.status(HttpStatus.InternalServerError).json({ err: error.message });
	}
});

router.get('/api/user', asyncWrapper(async (req: Request, res: Response) => {
	try {
		const {
			startDate, endDate, page, limit,
		}: PaginationParams = extractPaginationParams(req.query);
		const users = await userHandler.getUsers(startDate, endDate, page, limit);
		res.status(HttpStatus.OK).json(users);
	} catch (error) {
		console.error(error);
		res.status(HttpStatus.InternalServerError).json({ message: 'Failed to fetch users' });
	}
}));

router.get('/api/', (_, res) => res.send('Goodbye, I am working'));
