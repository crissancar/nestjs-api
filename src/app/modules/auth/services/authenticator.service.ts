import { Injectable } from '@nestjs/common';

import { CheckBlacklistUserRequest } from '../../blacklists/user/dtos/check-blacklist-user-request.dto';
import { BlacklistUserChecker } from '../../blacklists/user/services/blacklist-user-checker.service';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { FindUserByEmailRequest } from '../../users/dtos/find-user-by-email-request.dto';
import { UserEntity } from '../../users/persistence/user.entity';
import { UserFinderForAuthentication } from '../../users/services/user-finder-for-authentication.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginUserRequest } from '../dtos/login-user-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { authenticator } = authConfig;
const { className } = authenticator.constants;
const { requestLog } = authenticator.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class Authenticator {
	constructor(
		private readonly userFinder: UserFinderForAuthentication,
		private readonly blacklistUserChecker: BlacklistUserChecker,
	) {}

	async run(request: LoginUserRequest): Promise<AuthenticatedUser> {
		logger.log(requestLog);

		const user = await this.getUser(request.email);

		await this.checkUserBlocked(user);

		this.checkUserAuthentication(request, user);

		return AuthenticatedUser.create(user);
	}

	private async getUser(email: string): Promise<UserEntity> {
		const request = FindUserByEmailRequest.create(email);

		return this.userFinder.run(request);
	}

	private async checkUserBlocked(user: UserEntity): Promise<void> {
		const request = CheckBlacklistUserRequest.create(user.id);

		await this.blacklistUserChecker.run(request);
	}

	private checkUserAuthentication(request: LoginUserRequest, user: UserEntity): void {
		const { password: requestPassword } = request;
		const { password: userPassword } = user;

		if (!UserEntity.comparePasswords(requestPassword, userPassword)) {
			throw new InvalidCredentialsException();
		}
	}
}
