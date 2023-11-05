import { HttpStatus } from '@nestjs/common';

import { ApiResponseExamples } from '../../../shared/config/swagger/interfaces/api-response-examples.interface';
import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { sharedResponsesExamplesSwagger } from '../../../shared/config/swagger/shared-responses-examples.swagger';
import { CreateUserRequest } from '../../dtos/create-user-request.dto';
import { CreateUserResponse } from '../../dtos/create-user-response.dto';
import { DeleteUserResponse } from '../../dtos/delete-user-response.dto';
import { FindUserByIdResponse } from '../../dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaResponse } from '../../dtos/find-users-by-criteria-response.dto';
import { SoftDeleteUserResponse } from '../../dtos/soft-delete-user-response.dto';
import { UpdateUserPasswordRequest } from '../../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../../dtos/update-user-response.dto';

const { unauthorized } = sharedResponsesExamplesSwagger;
const { ok } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const usersSwaggerConfig = {
	tag: 'Users',
	create: {
		operation: {
			summary: 'Create user',
		},
		body: { type: CreateUserRequest },
		response: {
			created: {
				status: HttpStatus.CREATED,
				description: 'Created',
				type: CreateUserResponse,
			},
			badRequest: {
				UserWithEmailAlreadyExistsException: {
					description:
						'API throws an error when attempting to create a user because the email already exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'User with email <default@mail.es> already exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	delete: {
		operation: {
			summary: 'Delete user',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: DeleteUserResponse,
			},
			badRequest: {
				DeleteUserException: {
					description: 'API throws an error when attempting to delete a user',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Delete user failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
				...unauthorized.userIsNotOwner,
			},
		},
	},
	softDelete: {
		operation: {
			summary: 'Soft delete user',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: SoftDeleteUserResponse,
			},
			badRequest: {
				SoftDeleteUserException: {
					description: 'API throws an error when attempting to soft delete a user',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Softelete user failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
				...unauthorized.userIsNotOwner,
			},
		},
	},
	update: {
		operation: {
			summary: 'Update user',
		},
		body: { type: UpdateUserRequest },
		param: idParam,
		response: {
			created: {
				description: 'Updated',
				type: UpdateUserResponse,
			},
			badRequest: {
				UserWithEmailAlreadyExistsException: {
					description:
						'API throws an error when attempting to update a user because the email already exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'User with email <default@mail.es> already exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
				...unauthorized.userIsNotOwner,
			},
		},
	},
	updateUserPassword: {
		operation: {
			summary: 'Update user password',
		},
		body: { type: UpdateUserPasswordRequest },
		param: idParam,
		response: {
			created: {
				description: 'Updated',
				type: UpdateUserResponse,
			},
			badRequest: {
				InvalidCredentialsException: {
					description: 'API throws an error when attempting to update a user password',
					value: {
						status: HttpStatus.UNAUTHORIZED,
						message: 'Invalid credentials',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
				...unauthorized.userIsNotOwner,
				...unauthorized.invalidCredentials,
			},
		},
	},
	findById: {
		operation: {
			summary: 'Find user by id',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: FindUserByIdResponse,
			},
			badRequest: {
				UserWithIdNotExistsException: {
					description: 'API throws an error when attempting to find a user by id',
					value: {
						status: HttpStatus.NOT_FOUND,
						message: 'User with id <69483301-70d1-41bd-89bd-0dc7a2a1eff8> not exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
				...unauthorized.userIsNotOwner,
			},
		},
	},
	findByCriteria: {
		operation: {
			summary: 'Find users by criteria',
		},
		response: {
			ok: {
				...ok,
				type: FindUsersByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest: {
				FindUsersByCriteriaException: {
					description: 'API throws an error when attempting to find a users by criteria',
					value: {
						status: HttpStatus.NOT_FOUND,
						message: 'Find users by criteria failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidToken,
			},
		},
	},
};
