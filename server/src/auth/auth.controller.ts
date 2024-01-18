import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AccessTokenGuard} from "./guard";
import {PayloadDto, PayloadReturnDto} from "./strategy/dto/payload.dto";
import {UserPayload} from "../users/decorator/user-payload.decorator";
import {RefreshTokenGuard} from "./guard/refreshToken.guard";
import {UserSession} from "../users/decorator/user-session.decorator";
import {
    SignInDto,
    SignUpDto,
    TokenDto, VkSignInDto
} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signUp')
    signUp(@Body() data: SignUpDto): Promise<TokenDto> {
        return this.authService.signUp(data);
    }

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
    logOut(@UserPayload() payload: PayloadDto): Promise<void> {
        return this.authService.logOut(payload.id);
    }

    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    refreshToken(@UserSession() session: PayloadReturnDto): Promise<TokenDto> {
        return this.authService.refreshToken(session);
    }
}
