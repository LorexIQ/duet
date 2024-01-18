import {User} from "@prisma/client";

export type UserPayloadData = Omit<User, 'password'>;
export type UserPayloadSelector = { [key in keyof User]?: boolean };
