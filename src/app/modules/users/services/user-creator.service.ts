import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { usersConfig } from '../config/users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserWithEmailAlreadyExistsException } from '../exceptions/user-with-email-already-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { creator, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = creator.constants;
const { requestLog } = creator.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: CreateUserRequest): Promise<CreateUserResponse> {
		logger.log(requestLog);

		const user = UserEntity.create(request.id, request.name, request.email, request.password);

		try {
			const createdUser = await this.repository.create(user);

			return CreateUserResponse.create(createdUser);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(user.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
