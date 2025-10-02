import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNumber, 
  IsPositive, 
  MinLength, 
  IsDateString, 
  IsArray,
  IsOptional
} from 'class-validator';

export class CreateObraDto {

  @ApiProperty({
    description: 'Nombre de la obra',
    example: 'Edificio Central Plaza'
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Ubicación geográfica de la obra',
    example: 'Santiago, Chile'
  })
  @IsString()
  @MinLength(3)
  location: string;

  @ApiProperty({
    description: 'Presupuesto total en pesos chilenos',
    example: 2500000
  })
  @IsNumber()
  @IsPositive()
  budget: number;

  @ApiProperty({
    description: 'Fecha de inicio de la obra (YYYY-MM-DD)',
    example: '2024-01-15'
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Fecha estimada de término de la obra (YYYY-MM-DD)',
    example: '2025-06-30'
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Descripción detallada de la obra',
    example: 'Construcción de un edificio corporativo de 20 pisos en el centro de Santiago.'
  })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty()
      @IsString({ each: true })
      @IsArray()
      @IsOptional()
      images?: string[];
}
