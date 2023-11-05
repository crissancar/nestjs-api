import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/config/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const SoftDeleteUserSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.softDelete.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.softDelete.param),
		ApiOkResponse(swagger.softDelete.response.ok),
		ApiCustomBadRequestResponse(swagger.softDelete.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.softDelete.response.badRequest),
	);
