import { HttpException, HttpStatus } from '@nestjs/common';

export class BlockedIpException extends HttpException {
	constructor() {
		super('IP address is blocked', HttpStatus.UNAUTHORIZED);
	}
}
