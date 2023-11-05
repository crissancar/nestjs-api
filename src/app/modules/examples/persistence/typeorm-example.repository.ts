import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { examplesConfig } from '../config/examples.config';
import { UpdateExampleRequest } from '../dtos/update-example-request.dto';
import { ExampleRepository } from '../repositories/example.repository';
import { ExampleEntity } from './example.entity';
import { ExampleCriteriaQuery } from './example-criteria.query';

const { typeOrmRepository } = examplesConfig;
const { className } = typeOrmRepository.constants;
const { create, update, deleteExample, softDelete, findByCriteria, findById } =
	typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmExampleRepository
	extends TypeOrmRepository<ExampleEntity>
	implements ExampleRepository
{
	async create(exampleEntity: ExampleEntity): Promise<ExampleEntity> {
		logger.log(create.requestLog);

		return this.persistEntity(exampleEntity);
	}

	async update(
		exampleEntity: ExampleEntity,
		request: UpdateExampleRequest,
	): Promise<ExampleEntity> {
		logger.log(update.requestLog);

		return this.persistEntity(exampleEntity, request);
	}

	async findById(id: string): Promise<Nullable<ExampleEntity>> {
		logger.log(findById.requestLog);

		const options = { where: { id } } as FindOneOptions<ExampleEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: ExampleCriteriaQuery): Promise<CriteriaResult<ExampleEntity>> {
		logger.log(findByCriteria.requestLog);

		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	async delete(id: string): Promise<boolean> {
		logger.log(deleteExample.requestLog);

		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async softDelete(id: string): Promise<boolean> {
		logger.log(softDelete.requestLog);

		const { affected } = await this.softDeleteEntity(id);

		return affected !== 0;
	}

	protected entitySchema(): GenericEntityClassOrSchema<ExampleEntity> {
		return ExampleEntity;
	}
}
