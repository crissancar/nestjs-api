import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/config/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const UpdateUserSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.update.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.update.param),
		ApiCreatedResponse(swagger.update.response.created),
		ApiCustomBadRequestResponse(swagger.update.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.update.response.unauthorized),
	);
