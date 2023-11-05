import { authSwaggerConfig } from './swagger/auth-swagger.config';

export const authConfig = {
	globalRoute: 'auth',
	swagger: authSwaggerConfig,
	postController: {
		constants: {
			className: 'AuthPostController',
			routes: {
				login: 'login',
				refreshToken: 'refresh-token',
			},
		},
		logs: {
			login: {
				requestLog: 'Request received to create an user token',
			},
			refresh: {
				requestLog: 'Request received to refresh an user token',
			},
		},
	},
	authenticator: {
		constants: {
			className: 'Authenticator',
		},
		logs: {
			requestLog: 'Running Authenticator',
		},
	},
	jwtCreator: {
		constants: {
			className: 'JwtCreator',
		},
		logs: {
			requestLog: 'Running JwtCreator',
		},
	},
	localStrategy: {
		constants: {
			className: 'LocalStrategy',
			strategyFields: {
				email: 'email',
				password: 'password',
			},
		},
		logs: {
			requestLog: 'Running local strategy',
		},
	},
	jwtStrategy: {
		constants: {
			className: 'JwtStrategy',
			strategyName: 'jwt',
		},
		logs: {
			requestLog: 'Running jwt strategy',
		},
	},
};
