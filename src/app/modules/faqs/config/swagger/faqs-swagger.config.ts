import { HttpStatus } from '@nestjs/common';

import { ApiResponseExamples } from '../../../shared/config/swagger/interfaces/api-response-examples.interface';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { sharedResponsesExamplesSwagger } from '../../../shared/config/swagger/shared-responses-examples.swagger';
import { FindFAQsByCriteriaResponse } from '../../dtos/find-faqs-by-criteria-response.dto';
import { FAQLanguages } from '../../enums/faq-languages.enum';

const { unauthorized } = sharedResponsesExamplesSwagger;
const { ok } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const faqsSwaggerConfig = {
	tag: 'FAQs',
	findByCriteria: {
		operation: {
			summary: 'Find FAQs by criteria',
		},
		query: {
			language: {
				name: 'language',
				description: 'Language of FAQs',
				type: String,
				enum: FAQLanguages,
				example: FAQLanguages.ENGLISH,
				required: false,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindFAQsByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest: {
				FindFAQsByCriteriaException: {
					description: 'API throws an error when attempting to find a FAQs by criteria',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Find FAQs by criteria failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
			},
		},
	},
};
