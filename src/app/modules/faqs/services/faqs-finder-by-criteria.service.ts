import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { faqsConfig } from '../config/faqs.config';
import { FindFAQsByCriteriaRequest } from '../dtos/find-faqs-by-criteria.request.dto';
import { FindFAQsByCriteriaResponse } from '../dtos/find-faqs-by-criteria-response.dto';
import { FAQCriteriaQuery } from '../persistence/faq-criteria.query';
import { FAQRepository } from '../repositories/faq.repository';

const { finderByCriteria, repository } = faqsConfig;
const { repositoryInterface } = repository;
const { className } = finderByCriteria.constants;
const { requestLog } = finderByCriteria.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class FAQsFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: FAQRepository) {}

	async run(request: FindFAQsByCriteriaRequest): Promise<FindFAQsByCriteriaResponse> {
		logger.log(requestLog);

		const query = FAQCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindFAQsByCriteriaResponse.create(query, criteriaResult);
	}
}
