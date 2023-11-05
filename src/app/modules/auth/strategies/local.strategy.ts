import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { Authenticator } from '../services/authenticator.service';

const { localStrategy } = authConfig;
const { className, strategyFields } = localStrategy.constants;
const { requestLog } = localStrategy.logs;
const { email, password } = strategyFields;

const logger = LoggerFactory.create(className);

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authenticator: Authenticator) {
		super({
			usernameField: email,
			passwordField: password,
		});
	}

	async validate(email: string, password: string): Promise<AuthenticatedUser> {
		logger.log(requestLog);

		return this.authenticator.run({ email, password });
	}
}
