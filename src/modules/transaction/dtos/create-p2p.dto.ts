import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreatePerToPerRequest {
  @ApiProperty()
  @IsString()
  @Length(23)
  origin_account_id: string;

  @ApiProperty()
  @IsString()
  @Length(23)
  destination_account_id: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.1)
  amount: number;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  authentication_code?: string;
}
