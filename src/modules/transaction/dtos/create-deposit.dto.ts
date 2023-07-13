import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';
import { EnumTransactionChannel } from '../entities/transaction.entity';

export class CreateDepositRequest {
  @ApiProperty()
  @IsString()
  @Length(20)
  account_id: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'amount max decimal places is 2' })
  @Min(0.1)
  amount: number;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  authentication_code?: string;

  @ApiProperty({ enum: EnumTransactionChannel })
  @IsEnum(EnumTransactionChannel)
  channel: EnumTransactionChannel;
}
