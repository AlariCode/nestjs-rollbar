import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LoggerModule } from '../../lib/logger.module';
import { RollbarLogger } from '../../lib';
import { ApiController } from '../mocks/api.controller';
import { ConfigModule } from '../mocks/config.module';
import { ConfigService } from '../mocks/config.service';

describe('RollbarAsyncE2e', () => {
	let api: INestApplication;
	let apiController: ApiController;
	let logger: RollbarLogger;

	beforeAll(async () => {
		const apiModule = await Test.createTestingModule({
			imports: [
				LoggerModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (configService: ConfigService) => {
						return {
							accessToken: configService.getToken(),
							environment: 'develop'
						};
					},
				}),
			],
			controllers: [ApiController],
		}).compile();
		api = apiModule.createNestApplication();
		await api.init();
		apiController = api.get<ApiController>(ApiController);
		logger = api.get<RollbarLogger>(RollbarLogger);
		logger.error = jest.fn();
		logger.log = jest.fn();
	});

	beforeEach(() => {
		logger.error = jest.fn();
		logger.log = jest.fn();
		logger.warn = jest.fn();
		logger.info = jest.fn();
	})

	describe('calls', () => {
		it('check token', async () => {
			expect(logger.options.accessToken).toEqual('1');
		});

		it('check decorator is called', async () => {
			await apiController.decoratorMethod();
			expect(logger.error).toBeCalledTimes(1);
		});

		it('error called', async () => {
			await apiController.errorMethod();
			expect(logger.error).toBeCalledTimes(1);
		});

		it('log called', async () => {
			await apiController.logMethod();
			expect(logger.log).toBeCalledTimes(1);
		});

		it('warn called', async () => {
			await apiController.warnMethod();
			expect(logger.warn).toBeCalledTimes(1);
		});

		it('warn info', async () => {
			await apiController.infoMethod();
			expect(logger.info).toBeCalledTimes(1);
		});
	});
});