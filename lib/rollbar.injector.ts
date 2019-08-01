import { Inject } from '@nestjs/common';
import { NEST_ROLLBAR_PROVIDER } from './constants';

export function RollbarInjection() {
	return Inject(NEST_ROLLBAR_PROVIDER);
}
