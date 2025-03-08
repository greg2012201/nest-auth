import { Controller, Get, Param } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserRepository) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.userService.findUserById(id);
  }
}
