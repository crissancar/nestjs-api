import { policiesSwaggerConfig } from './swagger/policies-swagger.config';

export const policiesConfig = {
	entity: { name: 'policy' },
	index: {
		fields: ['language', 'type'],
		options: { unique: true },
	},
	globalRoute: 'policies',
	swagger: policiesSwaggerConfig,
	repository: {
		repositoryInterface: 'PolicyRepository',
	},
	getController: {
		constants: {
			className: 'PolicyGetController',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Request received to find policies by criteria filter',
			},
		},
	},
	finderByCriteria: {
		constants: {
			className: 'PoliciesFinderByCriteria',
		},
		logs: {
			requestLog: 'Running PoliciesFinderByCriteria',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmPolicyRepository',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Finding policies by criteria filter in database',
			},
		},
	},
};
