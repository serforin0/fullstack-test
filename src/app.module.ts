import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedService } from './feed/feed.service';
import { FeedController } from './feed/feed.controller';
import { FeedModule } from './feed/feed.module';
import { AxiosModule } from './feed/axios.module'; 



@Module({
  imports: [AxiosModule, FeedModule],
  controllers: [AppController, FeedController],
  providers: [AppService, FeedService],
})
export class AppModule {}
