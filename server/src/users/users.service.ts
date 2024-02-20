import {Injectable} from '@nestjs/common';
import {Profile, User} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {IncorrectIDFormatException, UserNotFoundException} from "../errors";

type ID = string | number;

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    updateUser(userId: number, data: Partial<User>): Promise<User> {
        return this.prismaService.user.update({
            where: { id: userId },
            data
        });
    }
    updateProfile(profileId: number, data: Partial<Profile>): Promise<Profile> {
        return this.prismaService.profile.update({
            where: { id: profileId },
            data
        });
    }

    async deleteUserById(userId: number): Promise<Profile> {
        return this.prismaService.user.delete({
            where: { id: userId },
            include: { profile: true }
        }).then(user => user.profile);
    }

    async getProfileByUserId(userId: number): Promise<Profile> {
        return this.prismaService.user.findUnique({
            where: { id: userId },
            include: { profile: true }
        }).then(user => user.profile);
    }
    async getUserByProfileId(profileId: number): Promise<User> {
        return this.prismaService.profile.findUnique({
            where: { id: profileId },
            include: { user: true }
        }).then(profile => profile.user);
    }

    getUserById(userId: number): Promise<User> {
        return this.prismaService.user.findUnique({
            where: { id: userId }
        });
    }
    getProfileById(profileId: number): Promise<Profile> {
        return this.prismaService.profile.findUnique({
            where: { id: profileId }
        });
    }

    getUserByUsername(username: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: { username }
        });
    }
    getProfileByUsername(username: string): Promise<Profile> {
        return this.prismaService.profile.findUnique({
            where: { username }
        });
    }

    getUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
    getProfiles(): Promise<Profile[]> {
        return this.prismaService.profile.findMany();
    }

    checkIdCurrent(id: ID): void {
        if (!/^-?[\d.]+(?:e-?\d+)?$/.test(id.toString())) throw IncorrectIDFormatException;
    }
}
