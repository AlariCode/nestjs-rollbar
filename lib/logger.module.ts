import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { RollbarLogger } from './rollbar.logger';
import { NEST_ROLLBAR_PROVIDER } from './constants';
import { IRollbarConfig } from './config.interface';

@Global()
@Module({})
export class LoggerModule {
	static forRoot(config: IRollbarConfig): DynamicModule {
		const loggerServiceProvider: Provider = {
			provide: NEST_ROLLBAR_PROVIDER,
			useFactory: () => new RollbarLogger(config),
		};
		return {
			module: LoggerModule,
			providers: [loggerServiceProvider],
			exports: [loggerServiceProvider],
		};
	}
}
