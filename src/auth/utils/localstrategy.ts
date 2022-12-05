import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth-services/auth.service';

@Injectable()
export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authservice: AuthService,
  ) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.authservice.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
