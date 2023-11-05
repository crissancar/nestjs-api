import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotOwnerException extends HttpException {
	constructor() {
		super('User is not owner', HttpStatus.UNAUTHORIZED);
	}
}
