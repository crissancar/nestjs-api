import { FAQEntity } from './../../../src/app/modules/faqs/persistence/faq.entity';
import { FAQLanguages } from './../../../src/app/modules/faqs/enums/faq-languages.enum';
import { PhraseMother } from '../../../test/app/modules/shared/mothers/phrase.mother';
import { WordMother } from '../../../test/app/modules/shared/mothers/word.mother';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Uuid } from '../../../src/app/modules/shared/services/uuid.service';
import { Bcrypt } from '../../../src/app/modules/shared/services/bcrypt.service';

export default class FAQSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const id = Uuid.random();
        const language = FAQLanguages.ENGLISH;
        const title = WordMother.random();
        const text = PhraseMother.random();

        const faqEntity = FAQEntity.create(id, language, title, text);

        try {
            await dataSource.createEntityManager().save<FAQEntity>(faqEntity);
        } catch (error) {
            console.log(' -> data already exists :)');
        }
    }
}
