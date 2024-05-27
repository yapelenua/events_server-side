import { Module, MiddlewareConsumer } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [EventsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
