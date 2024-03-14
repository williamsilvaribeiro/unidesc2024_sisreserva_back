// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe o ConfigModule e ConfigService

import { AuthController } from './auth.controller';
import { AuthService } from 'src/Auth/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({ 
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({ 
        secret: configService.get<string>('SECRET_KEY'), 
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
