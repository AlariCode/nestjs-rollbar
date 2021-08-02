import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { RollbarLogger } from './rollbar.logger';
import { Configuration as RollbarOptions } from 'rollbar';
import { RollbarAsyncOptions } from './interfaces/rollbar-options.interface';

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

	static forRootAsync(options: RollbarAsyncOptions): DynamicModule {
		const asyncProvider = this.createAsyncProvider(options);
		return {
			module: LoggerModule,
			imports: options.imports,
			providers: [asyncProvider],
			exports: [asyncProvider],
		};
	}

	private static createAsyncProvider<T>(options: RollbarAsyncOptions): Provider {
		return {
			provide: RollbarLogger,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				logger = new RollbarLogger(config);
				return logger;
			},
			inject: options.inject || [],
		};
	}
}
