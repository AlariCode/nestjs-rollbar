# Rollbar Module for NestJS

NestJS Rollbar package allows you to extend standard Logger to send errors directly to Rollbar. Usage if quite simple. Get Rollbar Token from your project page and install nestjs-rollbar package:

```bash
npm i nestjs-rollbar
```

Then register module in your root app.module

```javascript
import { LoggerModule } from 'nestjs-rollbar';

@Module({
	imports: [
		// ...
		LoggerModule.forRoot({
			accessToken: configService.get('ROLLBAR_TOKEN'),
			environment: configService.get('ENVIROMENT'),
		}),
	],
})
export class AppModule {}
```

-   accessToken - your project token
-   environment - an environment that will be logged in Rollbar.

To use RollbarLogger in any service or controller just inject it with `@RollbarInjection` decorator in constructor:

```javascript
import { RollbarLogger, RollbarInjection } from 'nestjs-rollbar';

constructor(
		@RollbarInjection() private readonly rollbarLogger: RollbarLogger
	) {}
```

To log an error to Rollbar just call `error()` method:

```javascript
try {
	throw new Error('Test error');
} catch (error) {
	this.rollbarLogger.error(error, 'myMethod');
}
```

First parameter is an error object and the second - name of your method to show in logs.
