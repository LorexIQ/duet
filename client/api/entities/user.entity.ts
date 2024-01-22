export interface UserEntity {
    id: number;
    vkId: number;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
    birthday: string;
    status: string;
    access: boolean;
    gender: UserGenderEntity;
    role: UserRoleEntity;
}

export type UserGenderEntity = 'MALE' | 'FEMALE' | 'NULL';
export type UserRoleEntity = 'USER' | 'ADMIN';
