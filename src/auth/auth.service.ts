import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

type AuthDTO = { email: string; firstName: string; lastName: string };

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async signIn(user: AuthDTO) {
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const existingDbUser = await this.userRepository.findUserByEmail(
      user?.email || '',
    );
    if (existingDbUser) {
      return existingDbUser;
    }

    await this.createNewUser(user);
  }

  async createNewUser(user: AuthDTO) {
    await this.userRepository.createUser({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
  }
}
