import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './repositories/client.repository';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
