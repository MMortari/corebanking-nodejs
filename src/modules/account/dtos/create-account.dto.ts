import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { EnumAccountStatus } from '../entities/account.entity';

export class CreateAccountRequest {
  @ApiProperty()
  @IsString()
  @Length(20)
  holder_id: string;

  @ApiProperty()
  @IsString()
  @Length(4)
  branch_number: string;

  @ApiProperty()
  @IsEnum(EnumAccountStatus)
  status: EnumAccountStatus;
}

export class CreateAccountResponse {}
