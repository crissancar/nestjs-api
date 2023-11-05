export const blacklistUserConfig = {
	entity: { name: 'blacklist_user' },
	repository: {
		repositoryInterface: 'BlacklistUserRepository',
	},
	checker: {
		constants: {
			className: 'BlacklistUserChecker',
		},
		logs: {
			requestLog: 'Running BlacklistUserChecker',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmBlacklistUserRepository',
		},
		logs: {
			find: {
				requestLog: 'Finding blocked user in database',
			},
		},
	},
};
