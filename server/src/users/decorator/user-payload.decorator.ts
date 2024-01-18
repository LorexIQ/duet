import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {PayloadReturnDto} from "../../auth/strategy/dto/payload.dto";

export const UserPayload = createParamDecorator((data: undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        const sessionData = request.user as PayloadReturnDto;
        const payload = sessionData.payload;
        return payload ?? null;
    }
);
