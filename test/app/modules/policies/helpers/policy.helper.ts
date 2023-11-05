import { PolicyLanguages } from '../../../../../src/app/modules/policies/enums/policy-languages.enum';
import { PolicyTypes } from '../../../../../src/app/modules/policies/enums/policy-types.enum';
import { PolicyEntity } from '../../../../../src/app/modules/policies/persistence/policy.entity';
import { PhraseMother } from '../../shared/mothers/phrase.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class PolicyHelper {
	static async createRandom(): Promise<PolicyEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(PolicyEntity);

		const policyEntity = PolicyEntity.create(
			UuidMother.random(),
			WordMother.random(),
			PhraseMother.random(),
			PolicyTypes.TERMS_AND_CONDITIONS,
			PolicyLanguages.ENGLISH,
		);

		return repository.save(policyEntity);
	}
}
