import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { DeleteUserRequest } from '../dtos/delete-user-request.dto';
import { DeleteUserResponse } from '../dtos/delete-user-response.dto';
import { DeleteUserException } from '../exceptions/delete-user.exception';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { deleter, repository } = usersConfig;
const { repositoryInterface } = repository;
const { className } = deleter.constants;
const { requestLog } = deleter.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class UserDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: DeleteUserRequest): Promise<DeleteUserResponse> {
		logger.log(requestLog);

		try {
			const deletedUser = await this.repository.delete(request.id);

			if (!deletedUser) {
				throw new UserWithIdNotExistsException(request.id);
			}

			return DeleteUserResponse.create(request.id);
		} catch (error) {
			if (error instanceof UserWithIdNotExistsException) {
				throw error;
			}
			logger.error(error);
			throw new DeleteUserException();
		}
	}
}
