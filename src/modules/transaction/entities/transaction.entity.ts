import { Account } from 'src/modules/account/entities/account.entity';

export interface Transaction {
  id: string;
  account_id: Account['id'];

  amount: number;
  authentication_code?: string;
  channel: EnumTransactionChannel;

  balance_before: number;
  balance_after: number;

  created_at: Date;
  updated_at?: Date;
}

export enum EnumTransactionChannel {
  P2P = 'P2P',
  PIX = 'PIX',
  BILL = 'BILL',
  PAYMENT = 'PAYMENT',
  TED = 'TED',
  WITHDRAW = 'WITHDRAW',
}
