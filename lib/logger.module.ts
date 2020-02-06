import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { RollbarLogger } from './rollbar.logger';
import { IRollbarConfig } from './config.interface';

export let logger: RollbarLogger;

@Global()
@Module({})
export class LoggerModule {
	static forRoot(config: IRollbarConfig): DynamicModule {
		logger = new RollbarLogger(config);
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
