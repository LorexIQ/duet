export default function () {
    const currentUser = useMeAuth();

    return computed(() => currentUser.value?.role === 'ADMIN');
}
