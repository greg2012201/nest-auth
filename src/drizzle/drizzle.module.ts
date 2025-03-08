import { Module } from '@nestjs/common';
import { DrizzleProvider, drizzleProvider } from './drizzle.provider';

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleProvider],
})
export class DrizzleModule {}
