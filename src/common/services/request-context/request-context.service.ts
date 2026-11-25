import { Injectable, Scope } from '@nestjs/common'
import { User } from '@prisma-generate/client.js'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: User

  setUser(user: User): void {
    this._user = user
  }

  getUser(): User {
    return this._user
  }

  getUserId(): string {
    return this._user.id
  }
}
