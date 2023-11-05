import { HttpException, HttpStatus } from '@nestjs/common';

export class ExampleWithNameAlreadyExistsException extends HttpException {
	constructor(name: string) {
		super(`Example with name <${name}> already exists`, HttpStatus.NOT_FOUND);
	}
}
