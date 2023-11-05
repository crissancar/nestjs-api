import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserWithEmailAlreadyExistsException } from '../exceptions/user-with-email-already-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserFinderById } from './user-finder-by-id.service';

const { updater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = updater.constants;
const { requestLog } = updater.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserUpdater {
	constructor(
		@Inject(repositoryInterface) private readonly repository: UserRepository,
		private readonly finder: UserFinderById,
	) {}

	async run(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		const currentUser = await this.getCurrentUser(request.id);

		try {
			const updatedUser = await this.repository.update(currentUser, request);

			return UpdateUserResponse.create(updatedUser);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(request.email);
			}
			logger.error(error);
			throw error;
		}
	}

	private async getCurrentUser(id: string): Promise<UserEntity> {
		const request = FindUserByIdRequest.create(id);

		return (await this.finder.run(request)) as UserEntity;
	}
}
