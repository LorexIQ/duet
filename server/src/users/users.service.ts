import {Injectable} from '@nestjs/common';
import {User} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {UserPayloadSelector} from "./dto/user.payload.dto";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    update(userId: number, data: Partial<User>): Promise<User> {
        return this.prismaService.user.update({
            where: {
                id: userId
            },
            data
        });
    }

    async getUserById<T extends UserPayloadSelector>(userId: number, returnConfig?: T) {
        return this.prismaService.user.findUnique({
            select: this.getReturnConfig(returnConfig),
            where: { id: userId }
        }) as never as Promise<User>;
    }
    async getUserByUsername<T extends UserPayloadSelector>(username: string, returnConfig?: T) {
        return this.prismaService.user.findUnique({
            select: this.getReturnConfig(returnConfig),
            where: { username }
        }) as never as Promise<User>;
    }

    async getUsers<T extends UserPayloadSelector>(returnConfig?: T) {
        return this.prismaService.user.findMany({
            select: this.getReturnConfig(returnConfig)
        }) as never as Promise<User>[];
    }

    async userExistedOrFalse<T extends UserPayloadSelector>(config: Omit<Partial<User>, 'password'>, returnConfig?: T): Promise<false | User> {
        const id = config.id;
        const username = config.username;

        const user = await this.prismaService.user.findUnique({
            where: {
                id,
                username
            },
            select: this.getReturnConfig(returnConfig)
        }) as User;
        return user ?? false;
    }

    private getReturnConfig<T extends UserPayloadSelector>(config?: T): Required<UserPayloadSelector> {
        return {
            id: true,
            username: true,
            photo: true,
            refreshToken: false,
            firstName: true,
            lastName: true,
            birthday: true,
            status: true,
            access: true,
            password: false,

            ...config
        };
    }
}
