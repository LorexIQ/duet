export interface UserEntity {
    id: number;
    vkId: number;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
    birthday: string;
    status?: string;
    gender?: UserGenderEntity;
}

export type UserGenderEntity = 'MALE' | 'FEMALE';
export type UserRoleEntity = 'USER' | 'ADMIN';
