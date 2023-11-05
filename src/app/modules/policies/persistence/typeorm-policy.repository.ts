import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { policiesConfig } from '../config/policies.config';
import { PolicyCriteriaQuery } from '../dto/policy-criteria-query.dto';
import { PolicyRepository } from '../repositories/policy.repository';
import { PolicyEntity } from './policy.entity';

const { typeOrmRepository } = policiesConfig;
const { className } = typeOrmRepository.constants;
const { findByCriteria } = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmPolicyRepository
	extends TypeOrmRepository<PolicyEntity>
	implements PolicyRepository
{
	async findByCriteria(query: PolicyCriteriaQuery): Promise<CriteriaResult<PolicyEntity>> {
		logger.log(findByCriteria.requestLog);

		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<PolicyEntity> {
		return PolicyEntity;
	}
}
