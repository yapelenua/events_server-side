import { IsOptional, IsString, IsDateString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  @MinLength(1, { message: 'Title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Date cannot be empty' })
  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string' })
  date: string;

  @IsNotEmpty({ message: 'Location cannot be empty' })
  @IsString()
  @MinLength(1, { message: 'Location cannot be empty' })
  location: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty' })
  description: string;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsString()
  @MinLength(1, { message: 'Category cannot be empty' })
  category: string;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Title cannot be empty' })
  title?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string' })
  date?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Category cannot be empty' })
  category?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Location cannot be empty' })
  location?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty' })
  description?: string;
}
