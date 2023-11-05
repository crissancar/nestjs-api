import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { BlacklistIPChecker } from '../../blacklists/ip/services/blacklist-ip-checker.service';
import { LoggerFactory } from '../services/logger-factory.service';

const logger = LoggerFactory.create('BlacklistIPGuard');

@Injectable()
export class BlacklistIPGuard implements CanActivate {
	constructor(private readonly checker: BlacklistIPChecker) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		logger.log('Running BlacklistIPGuard');

		const request = context.switchToHttp().getRequest<Request>();

		const ip = String(request.headers['x-forwarded-for']);

		await this.checker.run(ip);

		return true;
	}
}
