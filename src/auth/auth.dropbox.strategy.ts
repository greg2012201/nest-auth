import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-dropbox-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

type DropboxProfile = {
  id: string;
  emails?: Array<{ value: string }>;
};

export type DropboxUser = {
  dropboxId: string;
  email: string | undefined;
  accessToken: string;
  refreshToken: string;
  userId: number;
};

@Injectable()
export class DropboxStrategy extends PassportStrategy(
  Strategy,
  'dropbox-oauth2',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      apiVersion: '2',
      clientID: configService.get<string>('DROPBOX_APP_KEY'),
      clientSecret: configService.get<string>('DROPBOX_APP_SECRET'),
      callbackURL: configService.get<string>('DROPBOX_CALLBACK_URL'),
      passReqToCallback: true,
    });
  }
  authorizationParams(req: any): Record<string, string> {
    const state = this.authService.createStateToken(req.state);
    return {
      response_type: 'code',
      token_access_type: 'offline',
      state,
    };
  }

  async validate(
    req: { query?: { state?: string } },
    accessToken: string,
    refreshToken: string,
    profile: DropboxProfile,
    done: VerifyCallback,
  ): Promise<void> {
    const { sub: userId } = this.authService.validateStateToken(
      req.query?.state ?? '',
    );

    const user: DropboxUser = {
      dropboxId: profile.id,
      email: profile?.emails?.[0]?.value,
      accessToken,
      refreshToken,
      userId: parseInt(userId) || 0,
    };

    done(null, user);
  }
}
