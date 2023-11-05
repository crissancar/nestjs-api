export const apiKeysConfig = {
	entity: { name: 'api_key' },
	repository: {
		repositoryInterface: 'ApiKeyRepository',
	},
	authenticator: {
		constants: {
			className: 'ApiKeyAuthenticator',
		},
		logs: {
			requestLog: 'Running api key authenticator',
		},
	},
	finder: {
		constants: {
			className: 'ApiKeyFinder',
		},
		logs: {
			requestLog: 'Running api key finder',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmApiKeyRepository',
		},
		logs: {
			requestLog: 'Finding api key in database',
		},
	},
	strategy: {
		constants: {
			className: 'ApiKeyStrategy',
		},
		logs: {
			requestLog: 'Running api key strategy',
		},
	},
};
