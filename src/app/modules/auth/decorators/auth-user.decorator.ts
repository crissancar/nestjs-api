import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { LoggerFactory } from '../../shared/services/logger-factory.service';

const logger = LoggerFactory.create('AuthUserDecorator');

export const AuthUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	logger.log('Running auth user decorator');

	const request = ctx.switchToHttp().getRequest<Request>();

	const { authUser } = request;

	return authUser;
});
