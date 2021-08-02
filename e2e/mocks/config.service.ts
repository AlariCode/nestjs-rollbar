import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
	getToken() {
		return '1';
	}
}
