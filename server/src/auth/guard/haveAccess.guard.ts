import {ExecutionContext, Injectable, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from "./accessToken.guard";
import {UserPayloadData} from "../../users/dto/user.payload.dto";
import {ContentAccessDividedException, RoleAccessDividedException} from "../../errors";
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";
import {Role} from "@prisma/client";
import {ROLES_KEY} from "../../users/decorator/roles.decorator";

@UseGuards(AccessTokenGuard)
@Injectable()
export class HaveAccessGuard extends AccessTokenGuard {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const isTokenValid = await super.canActivate(context);
    const user = context.switchToHttp().getRequest().user.user as UserPayloadData;
    const roleCheck = !requiredRoles ? true : requiredRoles.some(role => user.role === role);

    if (!user.access && user.role === 'USER')
      throw ContentAccessDividedException;
    else if (!roleCheck)
      throw RoleAccessDividedException;

    return Boolean(isTokenValid) && roleCheck;
  }
}
