import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../../prisma.service.js'
import { MailModule } from '../mail/mail.module.js'
import { MailService } from '../mail/mail.service.js'
import { UsersService } from '../users/users.service.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { JwtStrategy } from './jwt.strategy.js'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy, MailService],
})
export class AuthModule {}
