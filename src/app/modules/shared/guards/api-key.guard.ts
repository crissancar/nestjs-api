import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { InvalidApiKeyException } from '../../api-keys/exceptions/invalid-api-key.exception';
import { ApiKeyEntity } from '../../api-keys/persistence/api-key.entity';
import { apiKeyGuardConstants } from '../config/constants/api-key-guard.constants';
import { apiKeyGuardLogs } from '../config/logs/api-key-guard.logs';
import { LoggerFactory } from '../services/logger-factory.service';

const { requestLog } = apiKeyGuardLogs;
const { className, passportStrategy } = apiKeyGuardConstants;

const logger = LoggerFactory.create(className);

@Injectable()
export class ApiKeyGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		apiKey: ApiKeyEntity,
		info: unknown,
		context: ExecutionContext,
	): ApiKeyEntity {
		logger.log(requestLog);

		const request = context.switchToHttp().getRequest<Request>();

		if (!apiKey) {
			throw new InvalidApiKeyException();
		}

		request.apiKey = apiKey;

		return apiKey;
	}
}
