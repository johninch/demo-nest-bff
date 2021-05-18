import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './common/middleware/logger.middleware';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AnyExceptionFilter } from './common/filter/any-exception.filter';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
// import { ValidationPipe } from './common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 捕获所有异常。注意：AnyExceptionFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AnyExceptionFilter 捕获了。
  app.useGlobalFilters(new AnyExceptionFilter());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
