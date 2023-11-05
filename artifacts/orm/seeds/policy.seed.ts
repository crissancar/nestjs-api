import { PhraseMother } from './../../../test/app/modules/shared/mothers/phrase.mother';
import { WordMother } from './../../../test/app/modules/shared/mothers/word.mother';
import { PolicyEntity } from './../../../src/app/modules/policies/persistence/policy.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Uuid } from '../../../src/app/modules/shared/services/uuid.service';
import { Bcrypt } from '../../../src/app/modules/shared/services/bcrypt.service';
import { config } from '../../../src/config/app/index';
import { PolicyTypes } from '../../../src/app/modules/policies/enums/policy-types.enum';
import { PolicyLanguages } from '../../../src/app/modules/policies/enums/policy-languages.enum';

export default class PolicySeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const id = Uuid.random();
        const title = WordMother.random();
        const description = PhraseMother.random();
        const type = PolicyTypes.TERMS_AND_CONDITIONS;
        const language = PolicyLanguages.ENGLISH;

        const policyEntity = PolicyEntity.create(id, title, description, type, language);

        try {
            await dataSource.createEntityManager().save<PolicyEntity>(policyEntity);
        } catch (error) {
            console.log(' -> data already exists :)');
        }
    }
}
