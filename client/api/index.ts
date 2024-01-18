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

export type APIRoutes = {
    GET: {
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
}
