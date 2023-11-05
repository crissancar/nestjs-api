import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { SoftDeleteUserRequest } from '../dtos/soft-delete-user-request.dto';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';
import { SoftDeleteUserException } from '../exceptions/soft-delete-user.exception';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { softDeleter, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = softDeleter.constants;
const { requestLog } = softDeleter.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserSoftDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: SoftDeleteUserRequest): Promise<SoftDeleteUserResponse> {
		logger.log(requestLog);

		try {
			const softDeletedUser = await this.repository.softDelete(request.id);

			if (!softDeletedUser) {
				throw new UserWithIdNotExistsException(request.id);
			}

			return SoftDeleteUserResponse.create(request.id);
		} catch (error) {
			if (error instanceof UserWithIdNotExistsException) {
				throw error;
			}
			logger.error(error);
			throw new SoftDeleteUserException();
		}
	}
}
