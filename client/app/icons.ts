type IconsInnerType = { [name: string]: string };
const prepareIconsType = <T extends IconsInnerType>(config: T): T => config;

const icons = prepareIconsType({
    Magnifier: 'gravity-ui:magnifier',
    Reload: 'tabler:reload',
    Exit: 'solar:exit-bold',

    Access: 'uim:lock-access',
    ID: 'bxs:id-card',
    User: 'gridicons:user',
    Birthday: 'mingcute:birthday-2-fill',

    ArrowUp: 'icon-park-solid:up-one',
    ArrowDown: 'icon-park-solid:down-one',

    Eye: 'mdi:eye',
    EyeOff: 'mdi:eye-off',

    MenuOpen: 'line-md:close-to-menu-transition',
    MenuClose: 'line-md:menu-to-close-transition',

    VK: 'uil:vk',

    KeyCtrl: 'fluent:control-button-20-regular',
});

export type IconsType = keyof typeof icons;
export default icons;
