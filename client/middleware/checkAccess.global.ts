export default defineNuxtRouteMiddleware((to, from) => {
    const currentUser = useMeAuth();

    console.log(currentUser.value)
    if (!['/auth', '/accessDenied'].includes(to.path) && !currentUser.value?.access) {
        return navigateTo('/accessDenied');
    } else if (to.path === '/accessDenied' && currentUser.value?.access) {
        return navigateTo('/');
    }
})
