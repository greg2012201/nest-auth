import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [DrizzleModule, EncryptionModule],
  controllers: [UserController],
})
export class UserModule {}
