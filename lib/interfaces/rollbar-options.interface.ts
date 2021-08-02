import { ModuleMetadata } from '@nestjs/common';
import { Configuration as RollbarOptions } from 'rollbar';

export interface RollbarAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory?: (...args: any[]) => Promise<RollbarOptions> | RollbarOptions;
	inject?: any[];
}

export interface IRollbarOptions {
	errorName?: string;
	rethrow?: boolean;
}