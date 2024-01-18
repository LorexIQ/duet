import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {Request} from "express";
import {PayloadDto} from "./dto/payload.dto";
import {AuthorizedUserNotFoundException} from "../../errors";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('REFRESH_SECRET', ''),
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: PayloadDto): Promise<any> {
        const token = req.get('Authorization').replace('Bearer', '').trim();
        const user = await this.usersService.userExistedOrFalse(
            { id: payload.id },
            { refreshToken: true }
        );
        if (!user || !user.refreshToken) throw AuthorizedUserNotFoundException;

        return {
            token,
            payload,
            user
        };
    }
}
