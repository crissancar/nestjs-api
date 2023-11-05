import { usersSwaggerConfig } from './swagger/users-swagger.config';

export const usersConfig = {
	entity: { name: 'user' },
	globalRoute: 'users',
	swagger: usersSwaggerConfig,
	repository: {
		repositoryInterface: 'UserRepository',
	},
	getController: {
		constants: {
			className: 'UserGetController',
			routes: { find: ':id' },
			params: { id: 'id' },
		},
		logs: {
			find: {
				requestLog: 'Request received to find an user',
			},
			findByCriteria: {
				requestLog: 'Request received to find users by criteria',
			},
		},
	},
	postController: {
		constants: {
			className: 'UserPostController',
		},
		logs: {
			requestLog: 'Request received to create a new user',
		},
	},
	putController: {
		constants: {
			className: 'UserPutController',
			routes: { updateUser: ':id', updateUserPassword: ':id/update-password' },
			param: 'id',
		},
		logs: {
			requestLog: 'Request received to update an user',
		},
	},
	deleteController: {
		constants: {
			className: 'UserDeleteController',
			routes: { delete: ':id', softDelete: '/soft-delete/:id' },
			params: { id: 'id' },
		},
		logs: {
			deleteUser: {
				requestLog: 'Request received to delete an user',
			},
			softDelete: {
				requestLog: 'Request received to soft delete an user',
			},
		},
	},
	creator: {
		constants: {
			className: 'UserCreator',
		},
		logs: {
			requestLog: 'Running UserCreator',
		},
	},
	updater: {
		constants: {
			className: 'UserUpdater',
		},
		logs: {
			requestLog: 'Running UserUpdater',
			foundLog: 'User to update found',
		},
	},
	passwordUpdater: {
		constants: {
			className: 'UserPasswordUpdater',
		},
		logs: {
			requestLog: 'Running UserPasswordUpdater',
			checkOldPasswordLog: 'Checking old password',
		},
	},
	deleter: {
		constants: {
			className: 'UserDeleter',
		},
		logs: {
			requestLog: 'Running UserDeleter',
		},
	},
	finderById: {
		constants: {
			className: 'UserFinderById',
		},
		logs: {
			requestLog: 'Running UserFinderById',
		},
	},
	finderByEmail: {
		constants: {
			className: 'UserFinderByEmail',
		},
		logs: {
			requestLog: 'Running UserFinderByEmail',
		},
	},
	finderByCriteria: {
		constants: {
			className: 'UsersFinderByCriteria',
		},
		logs: {
			requestLog: 'Running UsersFinderByCriteria',
		},
	},
	finderForAuthentication: {
		constants: {
			className: 'UserFinderForAuthentication',
		},
		logs: {
			requestLog: 'Running UserFinderForAuthentication',
		},
	},
	finderForStrategy: {
		constants: {
			className: 'UserFinderForStrategy',
		},
		logs: {
			requestLog: 'Running UserFinderForStrategy',
		},
	},
	softDeleter: {
		constants: {
			className: 'UserSoftDeleter',
		},
		logs: {
			requestLog: 'Running UserSoftDeleter',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmUserRepository',
		},
		logs: {
			create: {
				requestLog: 'Persisting user in database',
			},
			update: {
				requestLog: 'Persisting updated user in database',
			},
			updatePassword: {
				requestLog: 'Persisting updated password in database',
			},
			deleteUser: {
				requestLog: 'Deleting user from database',
			},
			softDelete: {
				requestLog: 'Soft deleting user from database',
			},
			findByEmail: {
				requestLog: 'Finding user by email in database',
			},
			findById: {
				requestLog: 'Finding user by id in database',
			},
			findByCriteria: {
				requestLog: 'Finding users by criteria filter in database',
			},
		},
	},
};
