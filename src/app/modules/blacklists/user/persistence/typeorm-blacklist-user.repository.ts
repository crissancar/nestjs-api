import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/types/nullable.type';
import { blacklistsConfig } from '../../config/blacklists.config';
import { BlacklistUserRepository } from '../repositories/blacklist-user.repository';
import { BlacklistUserEntity } from './blacklist-user.entity';

const { typeOrmRepository } = blacklistsConfig.user;
const { className } = typeOrmRepository.constants;
const { find } = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmBlacklistUserRepository
	extends TypeOrmRepository<BlacklistUserEntity>
	implements BlacklistUserRepository
{
	async find(userId: string): Promise<Nullable<BlacklistUserEntity>> {
		logger.log(find.requestLog);

		const options = { where: { userId } } as FindOneOptions<BlacklistUserEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistUserEntity> {
		return BlacklistUserEntity;
	}
}
