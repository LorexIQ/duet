import {Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {HaveAccessGuard} from "../auth/guard/haveAccess.guard";
import {AccessTokenGuard} from "../auth/guard";
import {Roles} from "./decorator/roles.decorator";
import {Profile, Role} from "@prisma/client";
import {UserUpdateAccessDto} from "./dto/user-update.dto";
import {UserNotFoundException} from "../errors";
import {UserProfile} from "./decorator/user-profile.decorator";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(HaveAccessGuard)
    getAll(): Promise<Profile[]> {
        return this.usersService.getProfiles();
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    getMe(@UserProfile() profile: Profile): Profile {
        return profile;
    }

    @Get(':id')
    @UseGuards(HaveAccessGuard)
    async getUserById(@Param('id') id: string) {
        this.usersService.checkIdCurrent(id);
        const profile = await this.usersService.getProfileByUserId(+id);
        if (!profile) throw UserNotFoundException;
        return profile;
    }

    @Patch('access/:id')
    @Roles(Role.ADMIN)
    @UseGuards(HaveAccessGuard)
    async setUserAccess(@Param('id') id: string, @Body() { access }: UserUpdateAccessDto) {
        this.usersService.checkIdCurrent(id);
        if (!await this.usersService.getProfileByUserId(+id)) throw UserNotFoundException;
        await this.usersService.updateProfile(+id, { access });
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(HaveAccessGuard)
    async deleteUserById(@Param('id') id: string): Promise<Profile> {
        this.usersService.checkIdCurrent(id);
        return this.usersService.deleteUserById(+id);
    }
}
