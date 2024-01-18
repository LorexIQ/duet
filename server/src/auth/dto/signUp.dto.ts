import {IsOptional, IsString, MinLength} from "class-validator";

export class SignUpMetaDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    birthday: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @MinLength(5)
    username: string;
}

export class SignUpDto extends SignUpMetaDto {
    @IsString()
    @MinLength(5)
    password: string;
}
