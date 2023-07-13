import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateClientRequest } from './dtos/create-client.dto';
import { ClientService } from './client.service';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() data: CreateClientRequest) {
    return this.clientService.create(data);
  }

  @Get()
  list() {
    return this.clientService.list();
  }
}
