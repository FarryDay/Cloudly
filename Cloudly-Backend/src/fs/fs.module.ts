import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'
import { FsService } from './fs.service';
import { FsController } from './fs.controller';

@Module({
  imports: [UsersModule],
  controllers: [FsController],
  providers: [FsService],
})
export class FsModule {}
