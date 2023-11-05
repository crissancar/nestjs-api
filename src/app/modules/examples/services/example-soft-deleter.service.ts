import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { SoftDeleteExampleRequest } from '../dtos/soft-delete-example-request.dto';
import { SoftDeleteExampleResponse } from '../dtos/soft-delete-example-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { softDeleter, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { className } = softDeleter.constants;
const { requestLog } = softDeleter.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class ExampleSoftDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: SoftDeleteExampleRequest): Promise<SoftDeleteExampleResponse> {
		logger.log(requestLog);

		const softDeletedExample = await this.repository.softDelete(request.id);

		if (!softDeletedExample) {
			throw new ExampleWithIdNotExistsException(request.id);
		}

		return SoftDeleteExampleResponse.create(request.id);
	}
}
