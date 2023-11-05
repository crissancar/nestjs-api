import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUserByEmailRequest } from '../dtos/find-user-by-email-request.dto';
import { FindUserByEmailResponse } from '../dtos/find-user-by-email-response.dto';
import { UserWithEmailNotExistsException } from '../exceptions/user-with-email-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { finderByEmail, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = finderByEmail.constants;
const { requestLog } = finderByEmail.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserFinderByEmail {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByEmailRequest): Promise<FindUserByEmailResponse> {
		logger.log(requestLog);

		const foundUser = await this.repository.findByEmail(request.email);

		if (!foundUser) {
			throw new UserWithEmailNotExistsException(request.email);
		}

		return FindUserByEmailResponse.create(foundUser);
	}
}
