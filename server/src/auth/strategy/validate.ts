import {Request} from "express";
import {PayloadReturnDto, TokenPayloadDto} from "./dto/payload.dto";
import {AuthorizedUserNotFoundException} from "../../errors";
import {UsersService} from "../../users/users.service";

export default async function (req: Request, tokenPayload: TokenPayloadDto, usersService: UsersService): Promise<PayloadReturnDto> {
    const token = req.get('Authorization').replace('Bearer', '').trim();
    const user = await usersService.getUserById(tokenPayload.id);
    if (!user || !user.refreshToken) throw AuthorizedUserNotFoundException;
    const profile = await usersService.getProfileByUserId(user.id);

    return {
        token,
        tokenPayload,
        profile,
        user
    };
}
