import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PolicyGetController } from './controllers/policy-get.controller';
import { PolicyEntity } from './persistence/policy.entity';
import { TypeOrmPolicyRepository } from './persistence/typeorm-policy.repository';
import { PoliciesFinderByCriteria } from './services/policies-finder-by-criteria.service';

@Module({
	imports: [TypeOrmModule.forFeature([PolicyEntity])],
	controllers: [PolicyGetController],
	providers: [
		PoliciesFinderByCriteria,
		{ provide: 'PolicyRepository', useClass: TypeOrmPolicyRepository },
	],
})
export class PoliciesModule {}
