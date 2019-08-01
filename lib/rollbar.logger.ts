import { Logger } from '@nestjs/common';
import * as Rollbar from 'rollbar';
import { IRollbarConfig } from './config.interface';

export class RollbarLogger extends Logger {
	rollbar;

	constructor({ accessToken, environment }: IRollbarConfig) {
		super();
		this.rollbar = new Rollbar({
			accessToken,
			environment,
		});
	}

	error(error: Error, context?: string) {
		this.rollbar.error(error);
		super.error(error.message, null, context);
	}
}
