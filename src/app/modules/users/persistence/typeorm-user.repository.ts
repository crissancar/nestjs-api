import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { usersConfig } from '../config/users.config';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from './user.entity';
import { UserCriteriaQuery } from './user-criteria.query';

const { typeOrmRepository } = usersConfig;
const { className } = typeOrmRepository.constants;
const {
	create,
	update,
	updatePassword,
	deleteUser,
	softDelete,
	findByCriteria,
	findById,
	findByEmail,
} = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmUserRepository extends TypeOrmRepository<UserEntity> implements UserRepository {
	async create(userEntity: UserEntity): Promise<UserEntity> {
		logger.log(create.requestLog);

		return this.persistEntity(userEntity);
	}

	async update(userEntity: UserEntity, request: UpdateUserRequest): Promise<UserEntity> {
		logger.log(update.requestLog);

		return this.persistEntity(userEntity, request);
	}

	async updatePassword(
		userEntity: UserEntity,
		request: UpdateUserPasswordRequest,
	): Promise<UserEntity> {
		logger.log(updatePassword.requestLog);

		return this.persistEntity(userEntity, request);
	}

	async findById(id: string): Promise<Nullable<UserEntity>> {
		logger.log(findById.requestLog);

		const options = { where: { id } } as FindOneOptions<UserEntity>;

		return this.findOneEntity(options);
	}

	async findByEmail(email: string): Promise<Nullable<UserEntity>> {
		logger.log(findByEmail.requestLog);

		const options = { where: { email } } as FindOneOptions<UserEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>> {
		logger.log(findByCriteria.requestLog);

		const { where, take, skip, sortName, sortOrder, sortColumn } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumnCase('name', sortName, sortOrder);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	async delete(id: string): Promise<boolean> {
		logger.log(deleteUser.requestLog);

		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async softDelete(id: string): Promise<boolean> {
		logger.log(softDelete.requestLog);

		const { affected } = await this.softDeleteEntity(id);

		return affected !== 0;
	}

	protected entitySchema(): GenericEntityClassOrSchema<UserEntity> {
		return UserEntity;
	}
}
