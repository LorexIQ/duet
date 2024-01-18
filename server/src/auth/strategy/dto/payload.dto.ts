import {UserPayloadData} from "../../../users/dto/user.payload.dto";

export class PayloadDto {
  id: number;
  iat: number;
  ext: number;
}

export class PayloadReturnDto {
  payload: PayloadDto;
  user: UserPayloadData;
  token: string;
}
