import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { RollbarLogger } from './rollbar.logger';
import { Configuration as RollbarOptions } from 'rollbar';

export let logger: RollbarLogger;

@Global()
@Module({})
export class LoggerModule {
	static forRoot(options: RollbarOptions): DynamicModule {
		logger = new RollbarLogger(options);
		const loggerServiceProvider: Provider = {
			provide: RollbarLogger,
			useFactory: () => logger,
		};
		return {
			module: LoggerModule,
			providers: [loggerServiceProvider],
			exports: [loggerServiceProvider],
		};
	}
}
