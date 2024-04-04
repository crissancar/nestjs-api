/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from './logger-factory.service';

enum CODE {
	UNIQUE = '23505',
}

enum ROUTINE {
	UNIQUE = '_bt_check_unique',
}

const logger = LoggerFactory.create('TypeOrmError');

export class TypeOrmError {
	static isUnique(error: QueryFailedError<any>): boolean {
		if (!error.driverError) {
			return false;
		}

		this.showLog(error);

		return error.driverError.code === CODE.UNIQUE && error.driverError.routine === ROUTINE.UNIQUE;
	}

	private static showLog(error: QueryFailedError<any>): void {
		const { message, query } = error;

		logger.error({ error: { message, query } }, 'TypeOrm response');
	}
}
