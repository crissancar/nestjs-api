import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { FindExampleByIdRequest } from '../dtos/find-example-by-id-request.dto';
import { FindExampleByIdResponse } from '../dtos/find-example-by-id-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { finderById, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { className } = finderById.constants;
const { requestLog } = finderById.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class ExampleFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: FindExampleByIdRequest): Promise<FindExampleByIdResponse> {
		logger.log(requestLog);

		const foundExample = await this.repository.findById(request.id);

		if (!foundExample) {
			throw new ExampleWithIdNotExistsException(request.id);
		}

		return FindExampleByIdResponse.create(foundExample);
	}
}
