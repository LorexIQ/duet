export default defineNuxtRouteMiddleware((to, from) => {
    const currentUser = useMeAuth();

    if (!['/auth', '/accessDenied'].includes(to.path) && !currentUser.value?.access) {
        return navigateTo(`/accessDenied?callback=${from.fullPath}`);
    } else if (to.path === '/accessDenied' && currentUser.value?.access) {
        return navigateTo(to.query.callback as string ?? '/');
    }
})
