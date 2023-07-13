import { Injectable } from '@nestjs/common';
import { Insertable } from 'kysely';

import { Database } from 'src/shared/database/knex/knex.database';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientRepository {
  // Get
  async findByDocument(document: string): Promise<Client> {
    const insert = await Database.query('client').select('*').where('document', '=', document).first();

    return insert;
  }
  async findById(id: string): Promise<Client> {
    const insert = await Database.query('client').select('*').where('id', '=', id).first();

    return insert;
  }
  async list(): Promise<Client[]> {
    const list = await Database.query('client').select('*').orderBy('created_at');

    return list;
  }

  // Insert
  async create(data: Insertable<Client>): Promise<Client> {
    const insert = await Database.query('client').insert(data).returning('*');

    return insert[0] as unknown as Client;
  }
}
