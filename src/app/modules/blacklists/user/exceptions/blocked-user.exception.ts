import { HttpException, HttpStatus } from '@nestjs/common';

export class BlockedUserException extends HttpException {
	constructor() {
		super('User is blocked', HttpStatus.UNAUTHORIZED);
	}
}
