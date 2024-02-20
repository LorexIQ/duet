/*
* Structure
*
* "*" before name param - required
* "?" after name param - optional
* "body" - only routes with body
*
* {METHOD}: {
*   {ROUTE PATH}: {
*       * response: {TYPE};
*       query?: { {QUERY KEY}: VALUE };
*       params?: { {PARAM KEY}: VALUE };
*       body?: { {DATA KEY}: VALUE };
*   };
* };
* */
import type {TokenEntity, UserEntity} from "~/api/entities";
import type {APIEmpty, APIParam} from "~/composables/useAPIFetch";

export type APIRoutes = {
    GET: {
        'users': {
            response: UserEntity[];
        },
        'users/{id}': {
            response: UserEntity;
            params: {
                id: APIParam;
            };
        };
        'users/me': {
            response: UserEntity;
        };
    },
    POST: {
        'auth/vkSignIn': {
            response: TokenEntity;
            body: {
                token: string;
                uuid: string;
            };
        };
    };
    PATCH: {
        'users/access/{id}': {
            response: APIEmpty;
            params: {
                id: APIParam;
            };
            body: {
                access: boolean;
            }
        }
    }
}
