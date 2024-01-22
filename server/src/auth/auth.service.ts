import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {UsersService} from "../users/users.service";
import {UserPayloadData} from "../users/dto/user.payload.dto";
import {PayloadReturnDto} from "./strategy/dto/payload.dto";
import {
    AccountDataConflictException,
    AuthorizedSessionNotFoundException,
    DBWorkException,
    DeviceIsNotFoundException,
    IncorrectPasswordException,
    UnknownErrorException,
    UserNotFoundException,
    VKGetUserException,
    VKSilentTokenException
} from "../errors";
import {
    SignInDto,
    SignUpDto,
    SignUpMetaDto,
    TokenDto,
    VkAccessDto,
    VkSignInDto,
    VkUserDto
} from "./dto";
import {User} from "@prisma/client";

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

    async signUp(data: SignUpDto): Promise<TokenDto> {
        data = {
            firstName: 'default',
            lastName: 'default',
            birthday: 'default',
            status: 'default',
            photo: 'https://pnglib.nyc3.cdn.digitaloceanspaces.com/uploads/2020/04/number-1-black-and-white_5e943a56765ba-768x768.png',
            ...data
        };

        if (await this.usersService.userExistedOrFalse({
            username: data.username
        })) throw AccountDataConflictException;

        try {
            const user = await this.createUser(data);
            const tokens = await this.createTokens(user);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                throw DBWorkException;
            } else {
                console.error(e);
                throw UnknownErrorException;
            }
        }
    }
    async signIn(data: SignInDto): Promise<TokenDto> {
        const user = await this.usersService.userExistedOrFalse(
            { username: data.username },
            { password: true }
        );

        if (user) {
            if (await argon2.verify(user.password, data.password)) {
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
            await this.usersService.update(userId, {
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

        const vkUser = await this.httpService.axiosRef.get(this.vkOrigin + 'account.getProfileInfo', {
            params: {
                v: '5.199',
                access_token: req.access_token
            }
        }).then((res: any) => res.data.response) as VkUserDto;
        if (!vkUser) throw VKGetUserException;

        let user = await this.usersService.getUserByUsername('ID' + vkUser.id);
        if (!user && vkUser.screen_name) user = await this.usersService.getUserByUsername(vkUser.screen_name);
        if (!user) {
            const isUserAdmin = vkUser.id == this.configService.get('VK_ADMIN_ID', 0);

            user = await this.createUser({
                username: vkUser.screen_name ?? 'ID' + vkUser.id,
                role: isUserAdmin ? 'ADMIN' : 'USER',
                gender: vkUser.sex === 1 ? 'FEMALE' : vkUser.sex === 2 ? 'MALE' : 'NULL',
                access: isUserAdmin,
                firstName: vkUser.first_name,
                lastName: vkUser.last_name,
                birthday: this.formatDateString(vkUser.bdate),
                status: vkUser.status,
                photo: vkUser.photo_200,
                vkId: vkUser.id
            });
        }

        const tokens = await this.createTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async refreshToken({ user, token }: PayloadReturnDto): Promise<any> {
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            token
        );
        if (!refreshTokenMatches) throw AuthorizedSessionNotFoundException;

        const tokens = await this.createTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    private async createUser(data: SignUpMetaDto & Partial<User>): Promise<User> {
        return this.prismaService.user.create({
            data: {
                ...data,
                ...(data.password ? { password: await this.hashData(data.password) } : {})
            }
        });
    }
    private hashData(data: string): Promise<string> {
        return argon2.hash(data, {
            salt: Buffer.from(this.configService.get<string>('SALT', ''))
        });
    }
    private async createTokens(data: UserPayloadData): Promise<TokenDto> {
        const payload = { id: data.id };

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
        const tokenHashed = await this.hashData(token);
        await this.usersService.update(userId, {
            refreshToken: tokenHashed
        });
    }
    private formatDateString(date: string) {
        return date.split('.').map(component => component.length === 1 ? '0' + component : component).join('.');
    }
}
