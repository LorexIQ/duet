export interface UserEntity {
    id: number;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
    birthday: string;
    status: string;
    access: boolean;
    role: 'USER' | 'ADMIN';
}
