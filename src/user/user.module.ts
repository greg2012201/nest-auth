import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [DrizzleModule],
  controllers: [UserController],
})
export class UserModule {}
