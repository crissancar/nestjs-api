import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/config/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { faqsConfig } from '../../faqs.config';

const { swagger } = faqsConfig;
const { security } = sharedConfigSwagger;

export const FindFAQsByCriteriaSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findByCriteria.operation),
		ApiSecurity(security.apiKey),
		ApiQuery(swagger.findByCriteria.query.language),
		ApiOkResponse(swagger.findByCriteria.response.ok),
		ApiCustomBadRequestResponse(swagger.findByCriteria.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.findByCriteria.response.unauthorized),
	);
