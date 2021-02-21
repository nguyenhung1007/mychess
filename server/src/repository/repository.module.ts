import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService]
})
export class RepositoryModule {}
