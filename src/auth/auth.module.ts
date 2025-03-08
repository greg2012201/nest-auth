import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth.google.strategy';
import { GoogleGuard } from './auth.google-guard';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, GoogleStrategy, GoogleGuard],
  exports: [AuthService, GoogleGuard],
  controllers: [AuthController],
})
export class AuthModule {}
