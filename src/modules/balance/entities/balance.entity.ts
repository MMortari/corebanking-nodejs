import { ColumnType } from 'kysely';
import { Account } from 'src/modules/account/entities/account.entity';

export interface Balance {
  id: string;
  account_id: Account['id'];
  parent_id?: Balance['id'];

  available_amount: number;
  blocked_amount: number;

  updated_at: ColumnType<Date, string | undefined, string | undefined>;
}
