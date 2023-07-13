import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { Account } from '../entities/account.entity';

export class GetInfoByIdRequest {
  @ApiProperty()
  @IsString()
  @Length(23)
  id: string;
}

export class GetInfoByIdResponse extends Account {
  balance: {
    available_amount: number;
    blocked_amount: number;
  };
}
