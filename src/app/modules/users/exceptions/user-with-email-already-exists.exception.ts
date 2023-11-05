import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithEmailAlreadyExistsException extends HttpException {
	constructor(email: string) {
		super(`User with email <${email}> already exists`, HttpStatus.BAD_REQUEST);
	}
}
