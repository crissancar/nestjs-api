import { HttpStatus } from '@nestjs/common';

import { ApiResponseExamples } from '../../../shared/config/swagger/interfaces/api-response-examples.interface';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { sharedResponsesExamplesSwagger } from '../../../shared/config/swagger/shared-responses-examples.swagger';
import { FindPoliciesByCriteriaResponse } from '../../dto/find-policies-by-criteria-response.dto';
import { policyPropertiesSwagger } from './properties/policy-properties.swagger';

const { type, language } = policyPropertiesSwagger;
const { unauthorized } = sharedResponsesExamplesSwagger;
const { ok } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const policiesSwaggerConfig = {
	tag: 'Policies',
	findByCriteria: {
		operation: {
			summary: 'Find policies by criteria',
		},
		query: {
			type: {
				...type,
				description: 'Type of policy file',
			},
			language: {
				...language,
				description: 'Language of policy file',
			},
		},
		response: {
			ok: {
				...ok,
				type: FindPoliciesByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest: {
				FindPoliciesByCriteriaException: {
					description: 'API throws an error when attempting to find a policies by criteria',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Find policies by criteria failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
			},
		},
	},
};
