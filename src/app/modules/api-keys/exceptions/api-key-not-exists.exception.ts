import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiKeyNotExistsException extends HttpException {
	constructor() {
		super('Api key not exists', HttpStatus.NOT_FOUND);
	}
}
