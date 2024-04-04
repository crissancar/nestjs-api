import { corsConfig } from './cors.config';
import { documentationConfig } from './documentation.config';
import { helmetConfig } from './helmet.config';
import { rateLimitConfig } from './rate-limit.config';

export const apiConfig = {
	api: {
		url: null as string,
		port: null as number,
		version: 'v1',
		responseTime: true,
		cors: corsConfig,
		documentation: documentationConfig,
		helmet: helmetConfig,
		rateLimit: rateLimitConfig,
	},
};
