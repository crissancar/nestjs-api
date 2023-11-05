import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
	origin: true,
	methods: ['GET', 'PATCH', 'POST', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Content-Language'],
	exposedHeaders: ['x-provider', 'take', 'page', 'count', 'X-Response-Time'],
};
