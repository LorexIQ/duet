import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PrismaService} from "../prisma.service";
import {UsersModule} from "../users/users.module";
import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategy";
import {JwtModule} from "@nestjs/jwt";
import {HttpModule} from "@nestjs/axios";

@Module({
    providers: [
        AuthService,
        PrismaService,
        AccessTokenStrategy,
        RefreshTokenStrategy
    ],
    controllers: [AuthController],
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET ?? '',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        HttpModule.register({})
    ]
})
export class AuthModule {
}
