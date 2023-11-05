import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUserByEmailRequest } from '../dtos/find-user-by-email-request.dto';
import { UserWithEmailNotExistsException } from '../exceptions/user-with-email-not-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { finderForAuthentication, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = finderForAuthentication.constants;
const { requestLog } = finderForAuthentication.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserFinderForAuthentication {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByEmailRequest): Promise<UserEntity> {
		logger.log(requestLog);

		const foundUser = await this.repository.findByEmail(request.email);

		if (!foundUser) {
			throw new UserWithEmailNotExistsException(request.email);
		}

		return foundUser;
	}
}
