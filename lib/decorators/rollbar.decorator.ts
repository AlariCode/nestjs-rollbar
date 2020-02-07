import { logger } from '../logger.module';
import { IRollbarOptions } from '../interfaces/rollbar-options.interface';

export const RollbarHandler = (options?: IRollbarOptions) => {
	return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		descriptor.value = async function() {
			try {
				const result = method.apply(this, arguments);
				if (result instanceof Promise) {
					return result.catch((error: Error) => {
						handleError(target, methodName, error, options);
					});
				}
				return result;
			} catch (error) {
				handleError(target, methodName, error, options);
			}
		};
		return descriptor;
	};
};

function handleError(target: any, methodName: string, error: Error, options?: IRollbarOptions) {
	if(options?.errorName) {
		error.name = options.errorName;
	}
	logger.error(error, `${target.constructor.name} -> ${methodName}`);
	if(options?.rethrow) {
		throw error;
	}
}
