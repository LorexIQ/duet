import {ExecutionContext, Injectable, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from "./accessToken.guard";
import {UserPayloadData} from "../../users/dto/user.payload.dto";
import {ContentAccessDividedException} from "../../errors";
import {ConfigService} from "@nestjs/config";

@UseGuards(AccessTokenGuard)
@Injectable()
export class HaveAccessGuard extends AccessTokenGuard {
  constructor(private configService: ConfigService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isTokenValid = await super.canActivate(context);
    const user = context.switchToHttp().getRequest().user.user as UserPayloadData;

    if (!user.access && user.username !== this.configService.get('VK_ADMIN_USERNAME', ''))
      throw ContentAccessDividedException;

    return Boolean(isTokenValid);
  }
}
