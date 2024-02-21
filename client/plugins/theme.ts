import type {Ref} from "vue";

export type Themes = 'light' | 'dark';
export type ThemesReturn = {
    selectedTheme: Readonly<Ref<Themes>>;
    selectTheme: (newTheme: Themes) => void;
};

const storeKey = 'duet:theme';
const themes: Themes[] = ['light', 'dark'];

const getTheme = (): Themes | null => localStorage.getItem(storeKey) as Themes;
const saveTheme = (newTheme: Themes): void => localStorage.setItem(storeKey, newTheme);

export default defineNuxtPlugin(() => {
    const state = ref<Themes>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const storedTheme = getTheme();
    if (!storedTheme) saveTheme(state.value);
    else if (themes.includes(storedTheme)) state.value = storedTheme;

    watch(state, value => {
        const page = document.getElementsByTagName('html')[0];
        page.setAttribute('class', value);

        saveTheme(value);
    }, { immediate: true });

    const payload: ThemesReturn = {
        selectedTheme: state,
        selectTheme: (newTheme: Themes) => state.value = newTheme
    };

    return {
        provide: {
            themes: payload
        }
    };
});
