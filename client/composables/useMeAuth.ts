import type {UserEntity} from "~/api/entities";

export default function () {
    return computed<UserEntity>(() => useLocalAuth().data.value as UserEntity);
}
