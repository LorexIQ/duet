export default async function (): Promise<string> {
    return await $fetch('https://api.ipify.org?format=json')
        .then((res: any) => res.ip)
        .catch(() => 'UnknownIP');
}
