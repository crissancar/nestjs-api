import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { authConfig } from '../../auth.config';

const { swagger } = authConfig;
const { security } = sharedConfigSwagger;

export const LoginSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.login.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.login.body),
		ApiOkResponse(swagger.login.response.ok),
		ApiCustomUnauthorizedResponse(swagger.login.response.unauthorized),
	);
