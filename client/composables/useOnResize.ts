export default function (resizeHandler: () => void, config?: { immediate: boolean }): void {
    if (config?.immediate) resizeHandler();

    onMounted(() => window.addEventListener('resize', resizeHandler));
    onUnmounted(() => window.removeEventListener('resize', resizeHandler));
}
