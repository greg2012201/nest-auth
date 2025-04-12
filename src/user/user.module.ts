import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [DrizzleModule, EncryptionModule],
  controllers: [UserController],
})
export class UserModule {}
