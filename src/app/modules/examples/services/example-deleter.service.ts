import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { DeleteExampleRequest } from '../dtos/delete-example-request.dto';
import { DeleteExampleResponse } from '../dtos/delete-example-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { deleter, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { className } = deleter.constants;
const { requestLog } = deleter.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class ExampleDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: DeleteExampleRequest): Promise<DeleteExampleResponse> {
		logger.log(requestLog);

		const deletedExample = await this.repository.delete(request.id);

		if (!deletedExample) {
			throw new ExampleWithIdNotExistsException(request.id);
		}

		return DeleteExampleResponse.create(request.id);
	}
}
