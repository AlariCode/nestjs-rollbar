import { logger } from '../logger.module';

export const RollbarHandler = (errorName?: string) => {
	return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		descriptor.value = async function() {
			try {
				const result = method.apply(this, arguments);
				if (result instanceof Promise) {
					return result.catch((error: Error) => {
						handleError(target, methodName, error, errorName);
					});
				}
				return result;
			} catch (error) {
				handleError(target, methodName, error, errorName);
			}
		};
		return descriptor;
	};
};

function handleError(target: any, methodName: string, error: Error, message?: string) {
	if(message) {
		error.name = message;
	}
	logger.error(error, `${target.constructor.name} -> ${methodName}`);
}
