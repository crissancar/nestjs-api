import { HttpException, HttpStatus } from '@nestjs/common';

export class FindPoliciesByCriteriaException extends HttpException {
	constructor() {
		super('Find policies by criteria failed', HttpStatus.BAD_REQUEST);
	}
}
