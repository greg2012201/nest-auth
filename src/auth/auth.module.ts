import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth.google.strategy';
import { GoogleGuard } from './auth.google-guard';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './auth.jwt.strategy';
import { JwtAuthGuard } from './auth.jwt-guard';
import { JwtModule } from '@nestjs/jwt';
import { DropboxGuard } from './auth.dropbox-guard';
import { PassportModule } from '@nestjs/passport';
import { DropboxStrategy } from './auth.dropbox.strategy';

@Module({
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleGuard,
    DropboxGuard,
    DropboxStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
  controllers: [AuthController],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
