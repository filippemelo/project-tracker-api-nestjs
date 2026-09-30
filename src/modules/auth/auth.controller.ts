import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { User } from '@prisma/client'
import { AuthenticatedUser } from '../../common/decorators/authenticated-user.decorator.js'
import { UsersService } from '../users/users.service.js'
import { ForgotPasswordDTO, ResetPasswordDTO, SignInDTO, SignUpDTO } from './auth.dto.js'
import { AuthService } from './auth.service.js'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  signup(@Body() data: SignUpDTO) {
    return this.authService.signup(data)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() data: SignInDTO) {
    return this.authService.signin(data)
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protected(@AuthenticatedUser() user: User) {
    return {
      message: `Authenticated! ${user.email}`,
    }
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() data: ForgotPasswordDTO) {
    return this.authService.forgotPassword(data.email)
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() data: ResetPasswordDTO) {
    return this.authService.resetPassword(data.token, data.newPassword)
  }
}
