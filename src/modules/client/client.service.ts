import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateClientRequest, CreateClientResponse } from './dtos/create-client.dto';
import { ClientRepository } from './repositories/client.repository';
import { generateId } from '../../shared/utils/id.util';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(data: CreateClientRequest): Promise<CreateClientResponse> {
    const id = generateId('client');

    const validate = await this.clientRepository.findByDocument(data.document);

    if (validate) throw new BadRequestException('Client already created with document');

    const insert = await this.clientRepository.create({ ...data, id });

    return insert;
  }
  async list(): Promise<Client[]> {
    const list = await this.clientRepository.list();

    return list;
  }
}
