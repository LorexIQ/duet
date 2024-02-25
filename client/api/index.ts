import type {
    AuthVkBodyEntity,
    TokenEntity,
    UserEntity
} from "~/api/entities";
import type {APIEmpty, APIParam} from "~/composables/useAPIFetch";

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
export type APIRoutes = {
    GET: {
        'profiles': {
            response: UserEntity[];
        },
        'profiles/{id}': {
            response: UserEntity;
            params: {
                id: APIParam;
            };
        };
        'profiles/me': {
            response: UserEntity;
        };
    },
    POST: {
        'auth/vkSignIn': {
            response: TokenEntity;
            body: AuthVkBodyEntity;
        };
    };
    PATCH: {

    }
}
