import { LoggerService } from '@nestjs/common';
import * as Rollbar from 'rollbar';

export class RollbarLogger extends Rollbar implements LoggerService {}
