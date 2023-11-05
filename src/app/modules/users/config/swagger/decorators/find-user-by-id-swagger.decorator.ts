import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/config/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const FindUserByIdSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findById.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.findById.param),
		ApiOkResponse(swagger.findById.response.ok),
		ApiCustomBadRequestResponse(swagger.findById.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.findById.response.unauthorized),
	);
