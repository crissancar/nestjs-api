import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { FAQEntity } from '../../../../../src/app/modules/faqs/persistence/faq.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { ApiKeyStorage } from '../../shared/storages/api-key.storage';
import { AppStorage } from '../../shared/storages/app.storage';
import { FAQHelper } from '../helpers/faq.helper';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let faq: FAQEntity;

describe('FAQGetController', () => {
	it('should find a valid FAQs by criteria', async () => {
		const url = `/faqs/?language=${faq.language}&take=0&page=1`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `ApiKey ${apiKey}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
	faq = await FAQHelper.createRandom();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
