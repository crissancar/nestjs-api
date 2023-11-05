import { Controller, Get, Query } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { ApiKeyAuthentication } from '../../shared/decorators/api-key-authentication.decorator';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { faqsConfig } from '../config/faqs.config';
import { FindFAQsByCriteriaSwagger } from '../config/swagger/decorators/find-faqs-by-criteria-swagger.decorator';
import { FindFAQsByCriteriaRequest } from '../dtos/find-faqs-by-criteria.request.dto';
import { FindFAQsByCriteriaResponse } from '../dtos/find-faqs-by-criteria-response.dto';
import { FAQsFinderByCriteria } from '../services/faqs-finder-by-criteria.service';

const { globalRoute, getController } = faqsConfig;
const { className } = getController.constants;
const { findByCriteria } = getController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class FAQGetController {
	constructor(private readonly finderByCriteria: FAQsFinderByCriteria) {}

	@FindFAQsByCriteriaSwagger()
	@ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindFAQsByCriteriaRequest,
	): Promise<FindFAQsByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
