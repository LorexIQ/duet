import {Body, Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserPayloadData} from "./dto/user.payload.dto";
import {HaveAccessGuard} from "../auth/guard/haveAccess.guard";
import {UserData} from "./decorator/user-data.decorator";
import {AccessTokenGuard} from "../auth/guard";
import {UserNotFoundException} from "../errors";
import {Roles} from "./decorator/roles.decorator";
import {Role} from "@prisma/client";
import {UserUpdateAccessDto} from "./dto/user-update.dto";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(HaveAccessGuard)
    getAll() {
        return this.usersService.getUsers();
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    getMe(@UserData() data: UserPayloadData) {
        return data;
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Patch('access/:id')
    @Roles(Role.ADMIN)
    @UseGuards(HaveAccessGuard)
    async setUserAccess(@Param('id') id: string, @Body() { access }: UserUpdateAccessDto) {
        await this.usersService.getUserById(id);
        await this.usersService.update(id, { access });
    }
}
