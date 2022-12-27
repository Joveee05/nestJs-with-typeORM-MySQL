import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../../../customers/dtos/createCustomer.dto';
import { CustomersService } from '../../../customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get(':id')
  getCustomers(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.status(200).json({
        status: 'success',
        data: customer,
      });
    } else {
      res.status(404).json({
        status: 'Failed',
        message: 'Customer not Found',
      });
    }
  }

  @Get('/search/:id')
  searchCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
