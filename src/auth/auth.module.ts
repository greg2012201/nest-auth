import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth.google.strategy';
import { GoogleGuard } from './auth.google-guard';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, GoogleStrategy, GoogleGuard],
  exports: [AuthService, GoogleGuard],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
