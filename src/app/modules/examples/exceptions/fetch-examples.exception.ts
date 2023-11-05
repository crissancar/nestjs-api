import { HttpException, HttpStatus } from '@nestjs/common';

export class FetchExamplesException extends HttpException {
	constructor() {
		super('Fetch users failed', HttpStatus.BAD_REQUEST);
	}
}
