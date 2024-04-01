import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { AxiosModule } from './axios.module'; // Importa el módulo que proporciona AxiosInstance

@Module({
  imports: [AxiosModule], // Importa el módulo que proporciona AxiosInstance
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
