import { Controller, Get, Param, Res } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.userRepository.getAllUsers();

    return res.json(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.userRepository.findUserById(id);
    return res.json(user);
  }
}
