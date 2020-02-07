# Rollbar Module for NestJS

![alt cover](https://github.com/AlariCode/nestjs-rollbar/raw/master/img/logo.jpg)

**More NestJS libs on [alariblog.ru](https://alariblog.ru)**

[![npm version](https://badgen.net/npm/v/nestjs-rollbar)](https://www.npmjs.com/package/nestjs-rollbar)
[![npm version](https://badgen.net/npm/license/nestjs-rollbar)](https://www.npmjs.com/package/nestjs-rollbar)
[![npm version](https://badgen.net/github/open-issues/AlariCode/nestjs-rollbar)](https://github.com/AlariCode/nestjs-rollbar/issues)
[![npm version](https://badgen.net/github/prs/AlariCode/nestjs-rollbar)](https://github.com/AlariCode/nestjs-rollbar/pulls)

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

To use RollbarLogger in any service or controller just inject it in constructor:

```javascript
import { RollbarLogger } from 'nestjs-rollbar';

constructor(
		private readonly rollbarLogger: RollbarLogger
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

## RollbarHandler decorator
If you want to automatically log error in controller or services method you can use RollbarHandler decorator.

```javascript
@Injectable()
export class AppService {

  @RollbarHandler()
  getHello() {
    throw new Error('asda');
  }
}
```

It will catch all errors in method and send them directly to Rollbar and print them in console. If you want to customize error name, pass it to decorator:

```javascript
@RollbarHandler({
   errorName: 'My error name',
})
```

To rethrow error to another decorator:

```javascript
@RollbarHandler({
   rethrow: true,
})
```
