import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../shared/services/logger-factory.service';
import { blacklistsConfig } from '../../config/blacklists.config';
import { BlockedIpException } from '../exceptions/blocked-ip.exception';
import { BlacklistIPRepository } from '../repositories/blacklist-ip.repository';

const { checker, repository } = blacklistsConfig.ip;
const { repositoryInterface } = repository;
const { className } = checker.constants;
const { requestLog } = checker.logs;

const logger = LoggerFactory.create(className);

@Injectable()
export class BlacklistIPChecker {
	constructor(@Inject(repositoryInterface) private readonly repository: BlacklistIPRepository) {}

	async run(ip: string): Promise<void> {
		logger.log(requestLog);

		const foundIP = await this.repository.find(ip);

		if (foundIP) {
			throw new BlockedIpException();
		}
	}
}
