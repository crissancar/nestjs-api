export const blacklistIPConfig = {
	entity: { name: 'blacklist_ip' },
	repository: {
		repositoryInterface: 'BlacklistIPRepository',
	},
	checker: {
		constants: {
			className: 'BlacklistIPChecker',
		},
		logs: {
			requestLog: 'Checking IP address',
		},
	},
	typeOrmRepository: {
		constants: {
			className: 'TypeOrmBlacklistIPRepository',
		},
		logs: {
			find: {
				requestLog: 'Finding blocked ip in database',
			},
		},
	},
};
