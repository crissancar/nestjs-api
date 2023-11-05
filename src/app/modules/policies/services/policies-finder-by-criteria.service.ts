import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { policiesConfig } from '../config/policies.config';
import { FindPoliciesByCriteriaRequest } from '../dto/find-policies-by-criteria.request.dto';
import { FindPoliciesByCriteriaResponse } from '../dto/find-policies-by-criteria-response.dto';
import { PolicyCriteriaQuery } from '../dto/policy-criteria-query.dto';
import { FindPoliciesByCriteriaException } from '../exceptions/find-policies-by-criteria.exception';
import { PolicyRepository } from '../repositories/policy.repository';

const { finderByCriteria, repository } = policiesConfig;
const { repositoryInterface } = repository;
const { className } = finderByCriteria.constants;
const { requestLog } = finderByCriteria.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class PoliciesFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: PolicyRepository) {}

	async run(request: FindPoliciesByCriteriaRequest): Promise<FindPoliciesByCriteriaResponse> {
		logger.log(requestLog);

		const query = PolicyCriteriaQuery.create(request);

		try {
			const criteriaResult = await this.repository.findByCriteria(query);

			return FindPoliciesByCriteriaResponse.create(query, criteriaResult);
		} catch (error) {
			logger.error(error);
			throw new FindPoliciesByCriteriaException();
		}
	}
}
