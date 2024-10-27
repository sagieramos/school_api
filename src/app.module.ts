import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware/* , logger */) // can take multiple arguments
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        /* { path: 'cats', method: RequestMethod.POST }, */
        'cats/(.*)',
      )
      .forRoutes(CatsController); // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
