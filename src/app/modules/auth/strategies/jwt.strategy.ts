import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '../../../../config/app/index';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { FindUserForStrategyResponse } from '../../users/dtos/find-user-for-strategy-response.dto';
import { UserFinderForStrategy } from '../../users/services/user-finder-for-strategy.service';
import { authConfig } from '../config/auth.config';
import { Payload } from '../interfaces/token.interface';

const { jwt } = config;
const { jwtStrategy } = authConfig;
const { className, strategyName } = jwtStrategy.constants;
const { requestLog } = jwtStrategy.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, strategyName) {
	constructor(private readonly userFinder: UserFinderForStrategy) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwt.secret,
		});
	}

	async validate(jwtPayload: Payload): Promise<FindUserForStrategyResponse> {
		logger.log(requestLog);

		const { sub } = jwtPayload;

		return this.userFinder.run({ id: sub });
	}
}
