import { examplesSwaggerConfig } from './swagger/examples-swagger.config';

export const examplesConfig = {
	entity: { name: 'example' },
	globalRoute: 'examples',
	swagger: examplesSwaggerConfig,
	repository: {
		repositoryInterface: 'ExampleRepository',
	},
	getController: {
		constants: {
			className: 'ExampleGetController',
			routes: { find: ':id' },
			params: { id: 'id' },
		},
		logs: {
			find: {
				requestLog: 'Request received to find an example',
			},
			findByCriteria: {
				requestLog: 'Request received to find examples by criteria',
			},
		},
	},
	postController: {
		constants: {
			className: 'ExamplePostController',
		},
		logs: {
			requestLog: 'Request received to create a new example',
		},
	},
	putController: {
		constants: {
			className: 'ExamplePutController',
			routes: { updateExample: ':id', updateExamplePassword: ':id/update-password' },
			param: 'id',
		},
		logs: {
			requestLog: 'Request received to update an example',
		},
	},
	deleteController: {
		constants: {
			className: 'ExampleDeleteController',
			routes: { delete: ':id', softDelete: '/soft-delete/:id' },
			params: { id: 'id' },
		},
		logs: {
			deleteExample: {
				requestLog: 'Request received to delete an example',
			},
			softDelete: {
				requestLog: 'Request received to soft delete an example',
			},
		},
	},
	creator: {
		constants: {
			className: 'ExampleCreator',
		},
		logs: {
			requestLog: 'Running ExampleCreator',
		},
	},
	updater: {
		constants: {
			className: 'ExampleUpdater',
		},
		logs: {
			requestLog: 'Running ExampleUpdater',
			foundLog: 'Example to update found',
		},
	},
	passwordUpdater: {
		constants: {
			className: 'ExamplePasswordUpdater',
		},
		logs: {
			requestLog: 'Running ExamplePasswordUpdater',
			checkOldPasswordLog: 'Checking old password',
		},
	},
	deleter: {
		constants: {
			className: 'ExampleDeleter',
		},
		logs: {
			requestLog: 'Running ExampleDeleter',
		},
	},
	finderById: {
		constants: {
			className: 'ExampleFinderById',
		},
		logs: {
			requestLog: 'Running ExampleFinderById',
		},
	},
	finderByEmail: {
		constants: {
			className: 'ExampleFinderByEmail',
		},
		logs: {
			requestLog: 'Running ExampleFinderByEmail',
		},
	},
	finderByCriteria: {
		constants: {
			className: 'ExamplesFinderByCriteria',
		},
		logs: {
			requestLog: 'Running ExamplesFinderByCriteria',
		},
	},
	finderForAuthentication: {
		constants: {
			className: 'ExampleFinderForAuthentication',
		},
		logs: {
			requestLog: 'Running ExampleFinderForAuthentication',
		},
	},
	finderForStrategy: {
		constants: {
			className: 'ExampleFinderForStrategy',
		},
		logs: {
			requestLog: 'Running ExampleFinderForStrategy',
		},
	},
	softDeleter: {
		constants: {
			className: 'ExampleSoftDeleter',
		},
		logs: {
			requestLog: 'Running ExampleSoftDeleter',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmExampleRepository',
		},
		logs: {
			create: {
				requestLog: 'Persisting example in database',
			},
			update: {
				requestLog: 'Persisting updated example in database',
			},
			deleteExample: {
				requestLog: 'Deleting example from database',
			},
			softDelete: {
				requestLog: 'Soft deleting example from database',
			},
			findById: {
				requestLog: 'Finding example by id in database',
			},
			findByCriteria: {
				requestLog: 'Finding examples by criteria filter in database',
			},
		},
	},
};
