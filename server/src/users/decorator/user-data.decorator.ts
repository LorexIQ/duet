import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {PayloadReturnDto} from "../../auth/strategy/dto/payload.dto";

export const UserData = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        const sessionData = request.user as PayloadReturnDto;
        const user = sessionData.user;
        return user ? data ? user[data] : user : null;
    }
);
