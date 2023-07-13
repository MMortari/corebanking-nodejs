import { Client } from '../../client/entities/client.entity';

export class Account {
  id: string;
  holder_id: Client['id'];

  branch_number: string;
  account_number: string;

  status: EnumAccountStatus;

  created_at: Date;
  updated_at?: Date;
}

export enum EnumAccountStatus {
  CANCELED = 'CANCELED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
