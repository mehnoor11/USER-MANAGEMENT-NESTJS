import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  productDescription: string;

  @IsNumber()
  createdBy: number;

  @IsEmpty()
  updatedBy: number;

  @IsEmpty()
  DeletedBy: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true; 
}
