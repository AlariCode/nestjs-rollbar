import { LoggerService } from '@nestjs/common';
import Rollbar from 'rollbar';

export class RollbarLogger extends Rollbar implements LoggerService {}
