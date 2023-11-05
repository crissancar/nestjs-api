import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { apiKeysConfig } from '../config/api-keys.config';
import { FindApiKeyRequest } from '../dtos/find-api-key.request.dto';
import { FindApiKeyResponse } from '../dtos/find-api-key.response.dto';
import { ApiKeyNotExistsException } from '../exceptions/api-key-not-exists.exception';
import { ApiKeyRepository } from '../repositories/api-key.repository';

const { finder, repository } = apiKeysConfig;
const { repositoryInterface } = repository;
const { className } = finder.constants;
const { requestLog } = finder.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class ApiKeyFinder {
	constructor(@Inject(repositoryInterface) private readonly repository: ApiKeyRepository) {}

	async run(request: FindApiKeyRequest): Promise<FindApiKeyResponse> {
		logger.log(requestLog);

		const apiKey = await this.repository.find(request.key);

		if (!apiKey) {
			const exception = new ApiKeyNotExistsException();
			logger.error(exception.message);
			throw exception;
		}

		return FindApiKeyResponse.create(apiKey.key, apiKey.audience);
	}
}
