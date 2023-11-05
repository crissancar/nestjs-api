import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { finderById, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = finderById.constants;
const { requestLog } = finderById.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		logger.log(requestLog);

		const foundUser = await this.repository.findById(request.id);

		if (!foundUser) {
			throw new UserWithIdNotExistsException(request.id);
		}

		return FindUserByIdResponse.create(foundUser);
	}
}
