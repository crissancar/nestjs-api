import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidApiKeyException extends HttpException {
	constructor() {
		super('Invalid Api key', HttpStatus.UNAUTHORIZED);
	}
}
