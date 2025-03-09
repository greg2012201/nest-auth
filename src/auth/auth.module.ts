import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth.google.strategy';
import { GoogleGuard } from './auth.google-guard';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './auth.jwt.strategy';
import { JwtAuthGuard } from './auth.jwt-guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, GoogleGuard, JwtAuthGuard],
  controllers: [AuthController],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
