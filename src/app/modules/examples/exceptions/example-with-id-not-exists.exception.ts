import { HttpException, HttpStatus } from '@nestjs/common';

export class ExampleWithIdNotExistsException extends HttpException {
	constructor(id: string) {
		super(`Example with id <${id}> not exists`, HttpStatus.NOT_FOUND);
	}
}
