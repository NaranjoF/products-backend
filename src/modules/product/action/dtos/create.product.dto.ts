import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  DESCRIPTION_IS_REQUIRED,
  DESCRIPTION_MUST_BE_A_STRING,
  NAME_IS_REQUIRED,
  NAME_MUST_BE_A_STRING,
  PRICE_IS_REQUIRED,
  PRICE_MUST_BE_A_NUMBER,
} from './dtos.constants';

export class CreateProductDto {
  @IsNotEmpty({ message: NAME_IS_REQUIRED })
  @IsString({ message: NAME_MUST_BE_A_STRING })
  name: string;

  @IsNotEmpty({ message: DESCRIPTION_IS_REQUIRED })
  @IsString({ message: DESCRIPTION_MUST_BE_A_STRING })
  description: string;

  @IsNotEmpty({ message: PRICE_IS_REQUIRED })
  @IsNumber({}, { message: PRICE_MUST_BE_A_NUMBER })
  price: number;
}
