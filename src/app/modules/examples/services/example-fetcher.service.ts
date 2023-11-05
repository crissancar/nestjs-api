import { Injectable } from '@nestjs/common';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

import { AxiosFetcher } from '../../axios/services/axios-fetcher.service';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { FetchExamplesException } from '../exceptions/fetch-examples.exception';

const logger = LoggerFactory.create('AxiosExampleFetcher');

interface RandomExampleResponse {
	results: Array<object>;
	info: {
		seed: string;
		results: number;
		page: number;
		version: string;
	};
}

export interface ExampleFetcherResponse {
	seed: string;
	results: number;
	page: number;
	version: string;
}

@Injectable()
export class ExampleFetcher extends AxiosFetcher {
	async randomExample(): Promise<ExampleFetcherResponse> {
		logger.log('Running AxiosExampleFetcher');

		const url = 'https://randomuser.me/api/';

		const headers = new AxiosHeaders();
		headers.setAuthorization('ApiKey 1234567890');

		const config = { headers } as AxiosRequestConfig;

		try {
			const { info } = await this.get<RandomExampleResponse>(url, config);

			return info;
		} catch (error) {
			throw new FetchExamplesException();
		}
	}
}
