import {IsNumber} from "class-validator";

export class UserGetDto {
    @IsNumber()
    id: number;
}
