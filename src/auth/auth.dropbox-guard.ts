import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DropboxGuard extends AuthGuard('dropbox-oauth2') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return {
      session: false,
      state: user?.userId || 'unknown',
    };
  }
}
