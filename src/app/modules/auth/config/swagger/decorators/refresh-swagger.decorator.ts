import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomUnauthorizedResponse } from '../../../../shared/config/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { authConfig } from '../../auth.config';

const { swagger } = authConfig;
const { security } = sharedConfigSwagger;

export const RefreshTokenSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.refreshToken.operation),
		ApiSecurity(security.bearer),
		ApiOkResponse(swagger.refreshToken.response.ok),
		ApiCustomUnauthorizedResponse(swagger.refreshToken.response.unauthorized),
	);
