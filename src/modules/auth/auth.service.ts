import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma.service.js'
import { UsersService } from '../users/users.service.js'
import { SignUpDTO } from './auth.dto.js'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signup(data: SignUpDTO) {
    // Criptografar a senha
    const hash = await bcrypt.hash(data.password, 12)

    // Salvar o usuário no banco de dados
    const newUser = await this.usersService.create({
      ...data,
      password: hash,
    })

    // retornar o token JWT de acesso
  }
}
