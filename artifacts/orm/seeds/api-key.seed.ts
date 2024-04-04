/* eslint-disable no-console */
import { generateApiKey } from 'generate-api-key';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ApiKeyAudiences } from '../../../src/app/modules/api-keys/enums/api-key-audiences.enum';
import { ApiKeyEntity } from '../../../src/app/modules/api-keys/persistence/api-key.entity';
import { Crypto } from '../../../src/app/modules/shared/services/crypto.service';

export default class ApiKeySeed implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		if (process.env.NODE_ENV !== 'development') {
			console.log(` -> It is not the development environment, skiping the Api Key seed`);

			return;
		}

		const client = 'Skeleton';
		const description = 'Seed generated key';
    const plainKey = '5AMDj6gLq8Jc9YWJq55sjb'
		const key = Crypto.cipher(plainKey);
		const audience = ApiKeyAudiences.GENERAL;

		try {
			const entityManager = dataSource.createEntityManager();

			const foundApiKeys = await entityManager.find<ApiKeyEntity>(ApiKeyEntity);

			if (foundApiKeys.length) {
				const cipherApiKey = foundApiKeys[0].key;
				const decipherApiKey = Crypto.decipher(cipherApiKey);
				console.log(`ApiKeySeed -> Api Key already exists <${decipherApiKey}>`);

				return;
			}

			const apiKeyEntity = entityManager.create(ApiKeyEntity, {
				client,
				description,
				key,
				audience,
			});

			console.log(`ApiKeySeed -> Api key created <${plainKey}>`);

			await entityManager.save<ApiKeyEntity>(apiKeyEntity);
		} catch (error) {
      console.error('ApiKeySeed error -> ', error.message);
		}
	}
}
