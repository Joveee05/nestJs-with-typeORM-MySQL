import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/createCustomer.dto';

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
      email: 'max@example.com',
      name: 'Max Lawrence',
    },
    {
      id: 2,
      email: 'adam@example.com',
      name: 'Adam Levine',
    },
    {
      id: 3,
      email: 'jovi@example.com',
      name: 'Jovi',
    },
  ];
  findCustomerById(id: number) {
    return this.users.find((user) => user.id === id);
  }
  createCustomer(customerDto: CreateCustomerDto) {
    this.users.push(customerDto);
    return customerDto;
  }
}
