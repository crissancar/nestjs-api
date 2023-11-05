import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithEmailNotExistsException extends HttpException {
	constructor(email: string) {
		super(`User with email <${email}> not exists`, HttpStatus.NOT_FOUND);
	}
}
