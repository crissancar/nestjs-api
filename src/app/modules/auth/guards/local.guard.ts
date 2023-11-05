import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: AuthenticatedUser,
		info: unknown,
		context: ExecutionContext,
	): boolean {
		const request = context.switchToHttp().getRequest<Request>();

		if (error) {
			throw error;
		}

		if (!user) {
			throw new InvalidCredentialsException();
		}

		request.authUser = user;

		return true;
	}
}
