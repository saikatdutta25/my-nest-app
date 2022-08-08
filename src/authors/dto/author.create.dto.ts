import { IsNumber, IsString } from 'class-validator';

export class CreateAuthorDTO {
  @IsString()
  name: string;

  @IsNumber()
  mobileNo: number;
}
