import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteUserException extends HttpException {
	constructor() {
		super('Delete user failed', HttpStatus.BAD_REQUEST);
	}
}
