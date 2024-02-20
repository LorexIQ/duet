import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AccessTokenGuard} from "./guard";
import {PayloadReturnDto} from "./strategy/dto/payload.dto";
import {RefreshTokenGuard} from "./guard/refreshToken.guard";
import {UserSession} from "../users/decorator/user-session.decorator";
import {
    SignInDto,
    VkSignInDto,
    TokenDto
} from "./dto";
import {UserData} from "../users/decorator/user-data.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/signIn')
    signIn(@Body() data: SignInDto): Promise<TokenDto> {
        return this.authService.signIn(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/vkSignIn')
    vkSignIn(@Body() data: VkSignInDto): Promise<TokenDto> {
        return this.authService.vkSignIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logout')
    logOut(@UserData() user: PayloadReturnDto['user']): Promise<void> {
        return this.authService.logOut(user.id);
    }

    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    refreshToken(@UserSession() session: PayloadReturnDto): Promise<TokenDto> {
        return this.authService.refreshToken(session);
    }
}
