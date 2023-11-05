import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { faqsConfig } from '../config/faqs.config';
import { FAQRepository } from '../repositories/faq.repository';
import { FAQEntity } from './faq.entity';
import { FAQCriteriaQuery } from './faq-criteria.query';

const { typeOrmRepository } = faqsConfig;
const { className } = typeOrmRepository.constants;
const { findByCriteria } = typeOrmRepository.logs;

const logger = LoggerFactory.create(className);

export class TypeOrmFAQRepository extends TypeOrmRepository<FAQEntity> implements FAQRepository {
	async findByCriteria(query: FAQCriteriaQuery): Promise<CriteriaResult<FAQEntity>> {
		logger.log(findByCriteria.requestLog);

		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<FAQEntity> {
		return FAQEntity;
	}
}
