export default defineNuxtRouteMiddleware((to, from) => {
    const currentUser = useMeAuth();
    const isAdmin = currentUser.value.role === 'ADMIN';

    if (!['/auth', '/accessDenied'].includes(to.path)) {
        if (to.path.toLowerCase().includes('admin') && !isAdmin)
            return navigateTo(`/accessDenied?callback=${from.fullPath}&message=В доступе отказано!`);
        else if (!currentUser.value?.access && !isAdmin)
            return navigateTo(`/accessDenied?callback=${from.fullPath}`);
    }

    if (to.path === '/accessDenied') {
        if (to.query.callback?.toString().toLowerCase().includes('admin'))
            if (isAdmin) return navigateTo(to.query.callback as string);
            else return;
        else if (currentUser.value?.access)
            return navigateTo(to.query.callback as string ?? '/');
    }
})
