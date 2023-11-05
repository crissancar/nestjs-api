import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { sharedResponsesExamplesSwagger } from '../../../shared/config/swagger/shared-responses-examples.swagger';
import { AuthenticatedUser } from '../../dtos/authenticated-user.dto';
import { LoginUserResponse } from '../../dtos/login-user.response.dto';
import { LoginUserRequest } from '../../dtos/login-user-request.dto';
import { RefreshTokenResponse } from '../../dtos/refresh-token-response.dto';

const { ok, badRequest } = sharedResponsesSwagger;
const { unauthorized } = sharedResponsesExamplesSwagger;

export const authSwaggerConfig = {
	tag: 'Auth',
	login: {
		operation: {
			summary: 'Login user',
		},
		body: { type: LoginUserRequest },
		response: {
			ok: {
				...ok,
				type: LoginUserResponse,
			},
			unauthorized: {
				...unauthorized.invalidApiKey,
				...unauthorized.invalidCredentials,
			},
		},
	},
	refreshToken: {
		operation: {
			summary: 'Refresh user token',
		},
		body: { type: AuthenticatedUser },
		response: {
			ok: {
				...ok,
				type: RefreshTokenResponse,
			},
			unauthorized: {
				...unauthorized.invalidToken,
			},
		},
	},
};
