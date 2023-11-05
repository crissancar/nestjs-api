import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidApiKeyAudienceException extends HttpException {
	constructor() {
		super('Invalid api key audience', HttpStatus.UNAUTHORIZED);
	}
}
