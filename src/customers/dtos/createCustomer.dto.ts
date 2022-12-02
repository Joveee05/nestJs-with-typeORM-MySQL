import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsNumber, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './createAddress.dto';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
