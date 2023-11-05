import { HttpStatus } from '@nestjs/common';

export const sharedResponsesExamplesSwagger = {
	unauthorized: {
		invalidToken: {
			InvalidTokenException: {
				description: 'JWT sign is invalid',
				value: {
					status: HttpStatus.UNAUTHORIZED,
					message: 'Invalid token',
				},
			},
		},
		invalidApiKey: {
			InvalidApiKeyException: {
				description: 'Api key is not authenticated',
				value: {
					status: HttpStatus.UNAUTHORIZED,
					message: 'Invalid Api key',
				},
			},
		},
		invalidCredentials: {
			InvalidCredentialsException: {
				description: 'User credentials are invalid',
				value: {
					status: HttpStatus.UNAUTHORIZED,
					message: 'Invalid credentials',
				},
			},
		},
		userIsNotOwner: {
			UserIsNotOwnerException: {
				description: 'The user is not owner of the userId sent in the request URI',
				value: {
					status: HttpStatus.UNAUTHORIZED,
					message: 'User is not owner',
				},
			},
		},
	},
};
