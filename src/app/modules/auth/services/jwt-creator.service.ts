import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { config } from '../../../../config/app/index';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { Payload, Token } from '../interfaces/token.interface';

const { jwtCreator } = authConfig;
const { className } = jwtCreator.constants;
const { requestLog } = jwtCreator.logs;
const { jwt } = config;

const logger = LoggerFactory.create(className);

@Injectable()
export class JwtCreator {
	constructor(private readonly jwt: JwtService) {}

	run(authUser: AuthenticatedUser): Token {
		logger.log(requestLog);

		const accessToken = this.createJwt(authUser, jwt.access.expiresIn);

		const refreshToken = this.createJwt(authUser, jwt.refresh.expiresIn);

		return { accessToken, refreshToken };
	}

	private createJwt(authUser: AuthenticatedUser, expiresIn: number): string {
		const payload = this.createPayload(authUser);
		const options = { expiresIn } as JwtSignOptions;

		return this.jwt.sign(payload, options);
	}

	private createPayload(authUser: AuthenticatedUser): Payload {
		const { id: sub, audiences: aud } = authUser;

		return { sub, aud };
	}
}
