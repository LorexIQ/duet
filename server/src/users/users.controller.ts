import {Controller, Get, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserPayloadData} from "./dto/user.payload.dto";
import {HaveAccessGuard} from "../auth/guard/haveAccess.guard";
import {UserData} from "./decorator/user-data.decorator";
import {AccessTokenGuard} from "../auth/guard";
import useWait from "../composables/useWait";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(HaveAccessGuard)
    getAll() {
        return this.usersService.getUsers();
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    getMe(@UserData() data: UserPayloadData) {
        return data;
    }
}
