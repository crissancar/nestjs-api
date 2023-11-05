import { HttpException, HttpStatus } from '@nestjs/common';

export class SoftDeleteUserException extends HttpException {
	constructor() {
		super('Soft delete user failed', HttpStatus.BAD_REQUEST);
	}
}
