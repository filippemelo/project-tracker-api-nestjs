import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma.service.js'
import { UsersService } from '../users/users.service.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, PrismaService],
})
export class AuthModule {}
