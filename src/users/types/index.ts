import { Exclude } from 'class-transformer';

export interface User {
  username: string;
  password: string;
}

export class serializedUser {
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<serializedUser>) {
    Object.assign(this, partial);
  }
}
