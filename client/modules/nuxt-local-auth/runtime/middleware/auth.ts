import { defineNuxtRouteMiddleware, navigateTo, useLocalAuth } from '#imports';
import useUtils from "../composables/useUtils";
import { getContext } from "../helpers";

type MiddlewareMeta = boolean | {
  unauthorizedOnly?: boolean;
  authorizedOnly?: boolean;
};

declare module '#app/../pages/runtime/composables' {
  interface PageMeta {
    localAuth?: MiddlewareMeta;
  }
}

export default defineNuxtRouteMiddleware(async to => {
  const { options, state: { meta} } = await getContext();
  const { trimStartWithSymbol, trimWithSymbol } = useUtils();
  const { checkAndSaveQueryAuth } = useLocalAuth();

  const metaAuth = typeof to.meta.localAuth === 'object' ?
    {
      unauthorizedOnly: false,
      authorizedOnly: false,
      ...to.meta.localAuth
    } :
    to.meta.localAuth;

  try {
    if (options.token.queryKey && to.query[options.token.queryKey])
      if (await checkAndSaveQueryAuth(to.query)) {
        return navigateTo(`/${trimStartWithSymbol(options.pages.defaultRedirect!, '/')}`, {
          external: true
        });
      }
  } catch (e) {
    console.error(e)
  }

  if (
    !metaAuth &&
    !options.pages.protectAllPages ||
    [trimWithSymbol(options.pages.serverIsDown!, '/')].includes(trimWithSymbol(to.path, '/'))
  ) return;
  if (metaAuth === false) return;

  const isAuthorized = meta.value.status === 'authorized';
  const isTimeout = meta.value.status === 'timeout';
  const isUnauthorizedOnly = typeof metaAuth === 'object' ? metaAuth.unauthorizedOnly : false;
  const isAuthorizedOnly = typeof metaAuth === 'object' ? metaAuth.authorizedOnly : false;

  if (isTimeout && options.pages.serverIsDown && to.path !== options.pages.serverIsDown) {
    return navigateTo(`/${trimStartWithSymbol(options.pages.serverIsDown!, '/')}`);
  }
  if (isAuthorized && to.path !== options.pages.defaultRedirect && isUnauthorizedOnly) {
    return navigateTo(`/${trimStartWithSymbol(options.pages.defaultRedirect!, '/')}`);
  }
  if (!isAuthorized && to.path !== options.pages.defaultRedirect && isAuthorizedOnly) {
    return navigateTo(`/${trimStartWithSymbol(options.pages.defaultRedirect!, '/')}`);
  }
  if (!isAuthorized && to.path !== options.pages.auth && !isUnauthorizedOnly) {
    return navigateTo(`/${trimStartWithSymbol(options.pages.auth!, '/')}`);
  }
});
