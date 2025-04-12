import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.userRepository.getAllUsers();

    return res.json(users);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.userRepository.findUserById(parseInt(id));
    return res.json(user);
  }
}
