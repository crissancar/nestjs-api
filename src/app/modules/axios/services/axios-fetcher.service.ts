import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { axiosConfig } from '../config/axios.config';

const { fetcher } = axiosConfig;
const { className } = fetcher.constants;

const logger = LoggerFactory.create(className);

@Injectable()
export class AxiosFetcher {
	private readonly axios: AxiosInstance;

	constructor(private readonly http: HttpService) {
		this.axios = http.axiosRef;
	}

	protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.get<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async post<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.post<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async put<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.put<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.delete<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	private printRequestLog(url: string, config: AxiosRequestConfig): void {
		logger.debug({ data: { url, config } }, 'Axios request');
	}

	private printResponseLog(response: AxiosResponse): void {
		const { status: statusCode, statusText } = response;

		logger.debug(
			{
				data: {
					status: { code: statusCode, message: statusText },
					headers: response.headers,
				},
			},
			'Axios response',
		);
	}

	private printErrorLog(error: unknown): void {
		const axiosError = error as AxiosError;

		if (axiosError.response) {
			const { status: code, statusText: message } = axiosError.response;
			logger.error({ error: { code, message } }, 'Axios error');
		} else {
			const { code, message } = axiosError;
			logger.error({ error: { code, message } }, 'Axios error');
		}
	}
}
