import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LoggerModule } from '../../lib/logger.module';
import { logger } from '../../lib';
import { ApiController } from '../mocks/api.controller';
import request from 'supertest';

describe('Rollbare2e', () => {
	let api: INestApplication;
	let apiController: ApiController;

	beforeAll(async () => {
		const apiModule = await Test.createTestingModule({
			imports: [
				LoggerModule.forRoot({
					accessToken: '',
					environment: 'develop'
				}),
			],
			controllers: [ApiController],
		}).compile();
		api = apiModule.createNestApplication();
		await api.init();
		apiController = api.get<ApiController>(ApiController);
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