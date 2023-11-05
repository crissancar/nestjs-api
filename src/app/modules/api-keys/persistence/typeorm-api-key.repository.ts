import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { apiKeysConfig } from '../config/api-keys.config';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyEntity } from './api-key.entity';

const { typeOrmRepository } = apiKeysConfig;
const { className } = typeOrmRepository.constants;
const { requestLog } = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmApiKeyRepository
	extends TypeOrmRepository<ApiKeyEntity>
	implements ApiKeyRepository
{
	async find(key: string): Promise<Nullable<ApiKeyEntity>> {
		logger.log(requestLog);

		const options = { where: { key } } as FindOneOptions<ApiKeyEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ApiKeyEntity> {
		return ApiKeyEntity;
	}
}
