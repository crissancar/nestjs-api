import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { FindUsersByCriteriaException } from '../exceptions/find-users-by-criteria.exception';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';
import { UserRepository } from '../repositories/user.repository';

const { finderByCriteria, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = finderByCriteria.constants;
const { requestLog } = finderByCriteria.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UsersFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUsersByCriteriaRequest): Promise<FindUsersByCriteriaResponse> {
		logger.log(requestLog);

		const query = UserCriteriaQuery.create(request);

		try {
			const criteriaResult = await this.repository.findByCriteria(query);

			return FindUsersByCriteriaResponse.create(query, criteriaResult);
		} catch (error) {
			logger.error(error);
			throw new FindUsersByCriteriaException();
		}
	}
}
