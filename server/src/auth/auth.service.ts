import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {UsersService} from "../users/users.service";
import {PayloadReturnDto} from "./strategy/dto/payload.dto";
import {
    AuthorizedSessionNotFoundException,
    DeviceIsNotFoundException,
    IncorrectPasswordException,
    UserNotFoundException,
    VKGetUserException,
    VKSilentTokenException
} from "../errors";
import {
    SignInDto,
    TokenDto,
    VkAccessDto,
    VkSignInDto,
    VkUserDto
} from "./dto";
import {Prisma, User} from "@prisma/client";

@Injectable()
export class AuthService {
    vkOrigin = 'https://api.vk.com/method/';

    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private httpService: HttpService
    ) {}

    async signIn(data: SignInDto): Promise<TokenDto> {
        const user = await this.usersService.getUserByUsername(data.username);

        if (user) {
            if (await bcrypt.compare(data.password, user.password)) {
                const tokens = await this.createTokens(user);
                await this.updateRefreshToken(user.id, tokens.refreshToken);
                return tokens;
            } else {
                throw IncorrectPasswordException;
            }
        } else {
            throw UserNotFoundException;
        }
    }
    async logOut(userId: number): Promise<void> {
        try {
            await this.usersService.updateUser(userId, {
                refreshToken: null
            });
        } catch (e) {
            throw DeviceIsNotFoundException;
        }
    }
    async vkSignIn(payload: VkSignInDto): Promise<any> {
        const req = await this.httpService.axiosRef.get(this.vkOrigin + 'auth.exchangeSilentAuthToken', {
            params: {
                v: '5.199',
                access_token: this.configService.get<string>('VK_ACCESS_TOKEN', ''),
                ...payload
            }
        }).then((res: any) => res.data.response) as VkAccessDto;
        if (!req) throw VKSilentTokenException;

        const vkToken = req.access_token;
        const vkUser = await this.httpService.axiosRef.get(this.vkOrigin + 'account.getProfileInfo', {
            params: {
                v: '5.199',
                access_token: vkToken
            }
        }).then((res: any) => res.data.response) as VkUserDto;
        if (!vkUser) throw VKGetUserException;

        let user = await this.usersService.getUserByUsername('ID' + vkUser.id);
        if (!user && vkUser.screen_name) user = await this.usersService.getUserByUsername(vkUser.screen_name);
        if (!user) {
            const isUserAdmin = vkUser.id == this.configService.get('VK_ADMIN_ID', 0);

            user = await this.createUser(
                {
                    username: vkUser.screen_name ?? 'ID' + vkUser.id,
                    vkToken
                },
                {
                    role: isUserAdmin ? 'ADMIN' : 'USER',
                    vkId: vkUser.id,
                    gender: vkUser.sex === 1 ? 'FEMALE' : vkUser.sex === 2 ? 'MALE' : 'NULL',
                    access: isUserAdmin,
                    firstName: vkUser.first_name,
                    lastName: vkUser.last_name,
                    birthday: this.formatDateString(vkUser.bdate),
                    status: vkUser.status,
                    photo: vkUser.photo_200
                }
            );
        }

        const tokens = await this.createTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async refreshToken({ user, token }: PayloadReturnDto): Promise<any> {
        const refreshTokenMatches = await bcrypt.compare(
            user.refreshToken,
            token
        );
        if (!refreshTokenMatches) throw AuthorizedSessionNotFoundException;

        const tokens = await this.createTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    private async createUser(user: Prisma.UserCreateInput, profile: Omit<Prisma.ProfileCreateInput, 'user'>): Promise<User> {
        return this.prismaService.user.create({
            data: {
                ...user,
                ...(user.password ? { password: this.hashData(user.password) } : {}),
                ...(user.vkToken ? { vkToken: this.hashData(user.vkToken) } : {}),
                profile: {
                    create: profile
                }
            }
        });
    }
    private hashData(data: string): string {
        return bcrypt.hashSync(data, 10);
    }
    private async createTokens(data: User): Promise<TokenDto> {
        const payload = {
            id: data.id,
            username: data.username
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('ACCESS_SECRET', ''),
                expiresIn: '24h'
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('REFRESH_SECRET', ''),
                expiresIn: '14d'
            })
        ])

        return { accessToken, refreshToken };
    }
    private async updateRefreshToken(userId: number, token: string) {
        const tokenHashed = this.hashData(token);
        await this.usersService.updateUser(userId, {
            refreshToken: tokenHashed
        });
    }
    private formatDateString(date: string) {
        return date.split('.').map(component => component.length === 1 ? '0' + component : component).join('.');
    }
}
