import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '../../users/persistence/user.entity';
import { ownerGuardConstants } from '../config/constants/owner-guard.constants';
import { ownerGuardLogs } from '../config/logs/owner-guard.logs';
import { UserIsNotOwnerException } from '../exceptions/user-is-not-owner.exception';
import { LoggerFactory } from '../services/logger-factory.service';

const { className } = ownerGuardConstants;
const { requestLog } = ownerGuardLogs;

const logger = LoggerFactory.create(className);

@Injectable()
export class OwnerGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		logger.log(requestLog);

		const request = context.switchToHttp().getRequest<Request>();

		const { id: ownerId } = request.params;
		const { id: authUserId } = request.user as UserEntity;

		if (ownerId !== authUserId) {
			throw new UserIsNotOwnerException();
		}

		return true;
	}
}
