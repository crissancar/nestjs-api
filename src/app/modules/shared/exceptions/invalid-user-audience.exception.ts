import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserAudienceException extends HttpException {
	constructor() {
		super('Invalid user audience', HttpStatus.UNAUTHORIZED);
	}
}
