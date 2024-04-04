import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

import { config } from '../app';
import { RedocOptions } from './redoc-options.interface';

const { api, project } = config;

export class SwaggerConfig {
	static documentBuilder(): Omit<OpenAPIObject, 'paths'> {
		return new DocumentBuilder()
			.setTitle(project.appName)
			.setDescription(project.description)
			.setContact(project.poweredBy, api.url, project.email)
			.setVersion(api.version)
			.addServer('/v1/', 'v1')
			.addApiKey({ type: 'apiKey', in: 'header', name: 'Authorization' }, 'ApiKey')
			.addBearerAuth()
			.addTag('Auth', 'Authentication use cases')
			.addTag('FAQs', 'FAQs use cases')
			.addTag('Policies', 'Policies use cases')
			.addTag('Users', 'Users use cases')
			.build();
	}

	static redocOptions(): RedocOptions {
		return {
			sortPropsAlphabetically: false,
			hideDownloadButton: true,
			hideHostname: false,
			noAutoAuth: false,
			disableSearch: false,
			tagGroups: [
				{
					name: 'Endpoints',
					tags: ['Auth', 'FAQs', 'Policies', 'Users'],
				},
			],
		};
	}

	static path(): string {
		return 'documentation';
	}
}
