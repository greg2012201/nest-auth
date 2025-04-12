import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    AuthModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    EncryptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
