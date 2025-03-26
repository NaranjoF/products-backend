import { IsNumber, IsString, ValidationArguments } from 'class-validator';
import {
  DESCRIPTION_MUST_BE_A_STRING,
  NAME_MUST_BE_A_STRING,
  PRICE_MUST_BE_A_NUMBER,
} from './dtos.constants';

export class UpdateProductDto {
  @IsString({ message: NAME_MUST_BE_A_STRING })
  name: string;

  @IsString({ message: DESCRIPTION_MUST_BE_A_STRING })
  description: string;

  @IsNumber({}, { message: PRICE_MUST_BE_A_NUMBER })
  price: number;
}
