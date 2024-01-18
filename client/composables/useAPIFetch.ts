import {$fetch} from "ofetch";
import type {APIRoutes} from "~/api";
import type {UseSwitch} from "~/composables/useSwitch";
import useAPIFetchStore from "~/composables/useAPIFetchStore";

export type APIQuery = string | number;
export type APIParam = string | number;
export type APIEmpty = {};
type APIMethodsStructureBody = {
    response: any;
    params?: APIMethodsStructureData<number>;
    query?: APIMethodsStructureData<string | number>
    body?: APIMethodsStructureData;
}
type APIMethodsStructureData<T = any> = {
    [param: string]: T;
};
export type APIMethods = keyof APIRoutes;
export type APIMethod<T extends APIMethods> = APIRoutes[T];

export type UseAPIFetchConfig<R> = {
    loader?: boolean | UseSwitch;
    success?: (res: R) => void;
    error?: (e: any) => void;
    finally?: () => void;
};
export type UseAPIFetchReturn<R> = Promise<R>;

function preparePath(path: string, params?: APIMethodsStructureData): string {
    if (params) {
        let newPath = path;

        for (const param in params) {
            newPath = newPath.replace(`{${param}}`, params[param]);
        }

        return newPath;
    }
    return path;
}

export default async function<
    Method extends keyof APIRoutes,
    Path extends keyof APIRoutes[Method],
    Options extends Omit<APIRoutes[Method][Path], 'response'>,
    // @ts-ignore
    Res extends APIRoutes[Method][Path]['response']
>(
    method: Method,
    path: Path,
    options?: Options,
    config?: UseAPIFetchConfig<Res>
): UseAPIFetchReturn<Res> {
    config = {
        loader: false,
        success: () => {},
        error: () => {},
        finally: () => {},
        ...config
    };

    const typedOptions = (options ?? {}) as Omit<APIMethodsStructureBody, 'response'>;
    const typedPath = path as string;

    const runtimeConfig = useRuntimeConfig();
    const fetchStore = useAPIFetchStore();
    const auth = useLocalAuth();

    if (config.loader) {
        if (typeof config.loader === 'boolean') fetchStore.addFetch();
        else config.loader.show();
    }

    return new Promise((resolve, reject) => {
        $fetch<Res>(
            `${runtimeConfig.public.serverOrigin}/api/${preparePath(typedPath, typedOptions.params)}/`,
            {
                method: method,
                query: typedOptions.query ?? {},
                ...(typedOptions.body ? { body: typedOptions.body } : {}),
                headers: { 'Authorization': `${auth.token.value}` }
            }
        )
            .then(res => {
                if (config?.success) config.success(res);
                resolve(res);
            })
            .catch(e => {
                if (config?.error) config.error(e);
                reject(e);
            })
            .finally(() => {
                if (config?.loader) {
                    if (typeof config.loader === 'boolean') fetchStore.removeFetch();
                    else config.loader.hide();
                }
                if (config?.finally) config.finally();
            });
    });
}
