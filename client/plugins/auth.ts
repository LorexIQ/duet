export default defineNuxtPlugin(async () => {
    console.info('Supabase auth is init!');

    const cookie = useCookie<string | null>('moviegram:auth', { default: () => null });

    console.log()

    const payload = {
        token: cookie
    };


    return {
        provide: {
            auth: payload
        }
    }
});
