import {ExecutionContext, Injectable, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from "./accessToken.guard";
import {ContentAccessDividedException, RoleAccessDividedException} from "../../errors";
import {Reflector} from "@nestjs/core";
import {Role} from "@prisma/client";
import {ROLES_KEY} from "../../users/decorator/roles.decorator";
import {PayloadReturnDto} from "../strategy/dto/payload.dto";

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
    const profile = (context.switchToHttp().getRequest().user as PayloadReturnDto).profile;
    const roleCheck = !requiredRoles ? true : requiredRoles.some(role => profile.role === role);

    if (!profile.access && profile.role === 'USER')
      throw ContentAccessDividedException;
    else if (!roleCheck)
      throw RoleAccessDividedException;

    return Boolean(isTokenValid) && roleCheck;
  }
}
