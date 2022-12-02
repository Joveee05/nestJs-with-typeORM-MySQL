import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;

  line2?: string;

  @IsNotEmpty()
  @IsNumber()
  zip: number;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;
}
