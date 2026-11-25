import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { type User } from '@prisma-generate/client.js'
import { AuthenticatedUser } from '../../common/decorators/authenticated-user.decorator.js'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard.js'
import { UsersService } from '../users/users.service.js'
import {
  ChangePasswordDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  SignInDTO,
  SignUpDTO,
} from './auth.dto.js'
import { AuthService } from './auth.service.js'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  async me(@AuthenticatedUser() user: User) {
    const userData = await this.userService.findById(user.id)

    if (!userData) {
      throw new UnauthorizedException('User not found')
    }

    return {
      id: userData.id,
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
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

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  async changePassword(@AuthenticatedUser() user: User, @Body() data: ChangePasswordDTO) {
    await this.authService.changePassword(user.id, data)
    return { message: 'Password changed successfully' }
  }
}
