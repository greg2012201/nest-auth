import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './auth.google-guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { DropboxGuard } from './auth.dropbox-guard';
import { JwtAuthGuard } from './auth.jwt-guard';
import { DropboxUser } from './auth.dropbox.strategy';

export interface DropboxRequest extends Request {
  user: DropboxUser;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, { httpOnly: true });
    return res.redirect('/users');
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/');
  }

  @Get('dropbox')
  @UseGuards(JwtAuthGuard, DropboxGuard)
  async connectDropbox() {}

  @Get('dropbox/callback')
  @UseGuards(DropboxGuard)
  async dropboxCallback(@Req() req: DropboxRequest, @Res() res: Response) {
    await this.authService.connectDropboxAccount(req.user);
    res.redirect('/users');
  }
}
