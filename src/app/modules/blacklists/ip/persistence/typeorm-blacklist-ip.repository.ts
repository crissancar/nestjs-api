import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/types/nullable.type';
import { blacklistsConfig } from '../../config/blacklists.config';
import { BlacklistIPRepository } from '../repositories/blacklist-ip.repository';
import { BlacklistIPEntity } from './blacklist-ip.entity';

const { typeOrmRepository } = blacklistsConfig.ip;
const { className } = typeOrmRepository.constants;
const { find } = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmBlacklistIPRepository
	extends TypeOrmRepository<BlacklistIPEntity>
	implements BlacklistIPRepository
{
	async find(ip: string): Promise<Nullable<BlacklistIPEntity>> {
		logger.log(find.requestLog);

		const options = { where: { ip } } as FindOneOptions<BlacklistIPEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistIPEntity> {
		return BlacklistIPEntity;
	}
}
