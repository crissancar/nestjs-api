import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { InvalidTokenException } from '../../auth/exceptions/invalid-token.exception';
import { UserEntity } from '../../users/persistence/user.entity';
import { jwtGuardConstants } from '../config/constants/jwt-guard.constants';
import { jwtGuardLogs } from '../config/logs/jwt-guard.logs';
import { LoggerFactory } from '../services/logger-factory.service';

const { className, passportStrategy } = jwtGuardConstants;
const { requestLog } = jwtGuardLogs;

const logger = LoggerFactory.create(className);

@Injectable()
export class JwtGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: UserEntity,
		info: unknown,
		context: ExecutionContext,
	): UserEntity {
		logger.log(requestLog);

		const request = context.switchToHttp().getRequest<Request>();

		if (!user) {
			throw new InvalidTokenException();
		}

		request.authUser = user;

		return user;
	}
}
