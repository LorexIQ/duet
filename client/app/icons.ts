type IconsInnerType = { [name: string]: string };
const prepareIconsType = <T extends IconsInnerType>(config: T): T => config;

const icons = prepareIconsType({
    Magnifier: 'gravity-ui:magnifier',
    Reload: 'tabler:reload',
    Exit: 'solar:exit-bold',

    ArrowUp: 'icon-park-solid:up-one',
    ArrowDown: 'icon-park-solid:down-one',

    Eye: 'mdi:eye',
    EyeOff: 'mdi:eye-off',

    VK: 'uil:vk',
});

export type IconsType = keyof typeof icons;
export default icons;
