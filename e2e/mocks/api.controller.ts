import { Controller, Get } from '@nestjs/common';
import { RollbarHandler, RollbarLogger } from '../../lib';

@Controller()
export class ApiController {
	constructor(
		private readonly rollbarLogger: RollbarLogger
	) { }

	@Get('decorator')
	@RollbarHandler()
	async decoratorMethod() {
		throw new Error('decorator-test');
	}

	@Get('rethrow')
	@RollbarHandler()
	@RollbarHandler({ rethrow: true })
	async rethrowMethod() {
		throw new Error('decorator-test');
	}

	@Get('error')
	@RollbarHandler()
	async errorMethod() {
		this.rollbarLogger.error('error');
	}

	@Get('log')
	@RollbarHandler()
	async logMethod() {
		this.rollbarLogger.log('log');
	}

	@Get('warn')
	@RollbarHandler()
	async warnMethod() {
		this.rollbarLogger.warn('warn');
	}

	@Get('info')
	@RollbarHandler()
	async infoMethod() {
		this.rollbarLogger.info('info');
	}
}
