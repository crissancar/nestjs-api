import { HttpException, HttpStatus } from '@nestjs/common';

export class FindFAQsByCriteriaException extends HttpException {
	constructor() {
		super('Find FAQs by criteria failed', HttpStatus.BAD_REQUEST);
	}
}
