import {IsBoolean} from "class-validator";

export class UserUpdateAccessDto {
    @IsBoolean()
    access: boolean;
}
