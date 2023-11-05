import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { apiKeyAudienceGuardConstants } from '../config/constants/api-key-audience-guard.constants';
import { apiKeyAudienceGuardLogs } from '../config/logs/api-key-audience-guard.logs';
import { InvalidApiKeyAudienceException } from '../exceptions/invalid-api-key-audience.exception';
import { LoggerFactory } from '../services/logger-factory.service';

const { className } = apiKeyAudienceGuardConstants;
const { requestLog } = apiKeyAudienceGuardLogs;

const logger = LoggerFactory.create(className);

@Injectable()
export class ApiKeyAudienceGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		logger.log(requestLog);

		const validAudiences = this.reflector.get<Array<string>>('audiences', context.getHandler());

		const apiKeyAudience = this.getApiKeyAudience(context);

		this.checkApiKeyAudience(apiKeyAudience, validAudiences);

		return true;
	}

	private getApiKeyAudience(context: ExecutionContext): ApiKeyAudiences {
		const request = context.switchToHttp().getRequest<Request>();

		const apiKey = request.apiKey;

		return apiKey.audience;
	}

	private checkApiKeyAudience(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): void {
		if (!this.areValidAudiences(apiKeyAudience, validAudiences)) {
			throw new InvalidApiKeyAudienceException();
		}
	}

	private areValidAudiences(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): boolean {
		return validAudiences.includes(apiKeyAudience);
	}
}
