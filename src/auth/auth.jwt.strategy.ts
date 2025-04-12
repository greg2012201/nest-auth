import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/user.repository';

type JWTPayload = { sub: string };

function extractTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  const match = cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = extractTokenFromCookie(request?.headers['cookie']);
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userRepository.findUserById(parseInt(payload.sub));
    if (!user) {
      throw new UnauthorizedException('Login to continue');
    }
    return {
      userId: payload.sub,
    };
  }
}
