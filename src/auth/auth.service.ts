import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type AuthDTO = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createAccessToken(userId: number) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: this.configService.get('JWT_SECRET') },
    );
  }

  async signIn(user: AuthDTO) {
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const existingDbUser = await this.userRepository.findUserByGoogleId(
      user.id || '', // in our db id that comes from google is is stored as google_id
    );
    if (existingDbUser) {
      return this.createAccessToken(existingDbUser.id);
    }

    const newUser = await this.createNewUser(user);
    console.log('newUser', newUser);
    if (!newUser) {
      throw new InternalServerErrorException('Could not create a user');
    }

    return this.createAccessToken(newUser.id);
  }

  async createNewUser(user: AuthDTO) {
    return this.userRepository.createUser({
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
  }
}
