import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PrismaService} from "../prisma.service";
import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategy";
import {JwtModule} from "@nestjs/jwt";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../users/users.module";

@Module({
    providers: [
        AuthService,
        PrismaService,
        AccessTokenStrategy,
        RefreshTokenStrategy
    ],
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET ?? '',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        HttpModule.register({}),
        UsersModule
    ]
})
export class AuthModule {
}
