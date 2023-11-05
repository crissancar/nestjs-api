import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const UpdateUserPasswordSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.updateUserPassword.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.updateUserPassword.param),
		ApiCreatedResponse(swagger.updateUserPassword.response.created),
		ApiCustomUnauthorizedResponse(swagger.updateUserPassword.response.unauthorized),
	);
