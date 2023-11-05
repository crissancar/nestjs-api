import { faqsSwaggerConfig } from './swagger/faqs-swagger.config';

export const faqsConfig = {
	entity: { name: 'faq' },
	globalRoute: 'faqs',
	swagger: faqsSwaggerConfig,
	repository: {
		repositoryInterface: 'FAQRepository',
	},
	getController: {
		constants: {
			className: 'FAQGetController',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Request received to find FAQs by criteria',
			},
		},
	},
	finderByCriteria: {
		constants: {
			className: 'FAQsFinderByCriteria',
		},
		logs: {
			requestLog: 'Running FAQsFinderByCriteria',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmFAQRepository',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Finding FAQs by criteria filter in database',
			},
		},
	},
};
