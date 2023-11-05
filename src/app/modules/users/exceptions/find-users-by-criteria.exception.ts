import { HttpException, HttpStatus } from '@nestjs/common';

export class FindUsersByCriteriaException extends HttpException {
	constructor() {
		super('Find users by criteria failed', HttpStatus.BAD_REQUEST);
	}
}
