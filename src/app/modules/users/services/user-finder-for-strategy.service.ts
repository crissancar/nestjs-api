import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserForStrategyResponse } from '../dtos/find-user-for-strategy-response.dto';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { finderForStrategy, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = finderForStrategy.constants;
const { requestLog } = finderForStrategy.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserFinderForStrategy {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByIdRequest): Promise<FindUserForStrategyResponse> {
		logger.log(requestLog);

		const foundUser = await this.repository.findById(request.id);

		if (!foundUser) {
			throw new UserWithIdNotExistsException(request.id);
		}

		return FindUserForStrategyResponse.create(foundUser);
	}
}
