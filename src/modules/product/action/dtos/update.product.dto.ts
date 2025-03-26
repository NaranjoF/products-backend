import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  DESCRIPTION_MUST_BE_A_STRING,
  NAME_MUST_BE_A_STRING,
  PRICE_MUST_BE_A_NUMBER,
} from './dtos.constants';

export class UpdateProductDto {
  @IsString({ message: NAME_MUST_BE_A_STRING })
  @IsOptional()
  name: string;

  @IsString({ message: DESCRIPTION_MUST_BE_A_STRING })
  @IsOptional()
  description: string;

  @IsNumber({}, { message: PRICE_MUST_BE_A_NUMBER })
  @IsOptional()
  price: number;
}
